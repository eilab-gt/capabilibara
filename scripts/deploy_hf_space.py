#!/usr/bin/env python3
"""Deploy Capabilibara Hugging Face Space under HCAI-Lab organization.

Usage:
    python scripts/deploy_hf_space.py [--org HCAI-Lab] [--name capabilibara] [--sdk gradio]

Requirements:
    - huggingface_hub installed (uv add huggingface_hub)
    - HF_TOKEN environment variable set or logged in via `hf auth login`
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

def get_hf_token(provided_token: str | None) -> str | None:
    if provided_token:
        return provided_token

    # Try fetching from 1Password via op-auto script or op CLI
    op_auto_script = Path.home() / "dotfiles" / "scripts" / "op-auto"
    op_reference = "op://Research Automation/Hugging Face/token"

    if op_auto_script.exists():
        try:
            res = subprocess.run(
                [str(op_auto_script), "read", op_reference],
                capture_output=True,
                text=True,
                check=True
            )
            token = res.stdout.strip()
            if token:
                print("🔑 Authenticated using Hugging Face token from 1Password (op-auto).")
                return token
        except subprocess.CalledProcessError:
            pass

    # Try op CLI directly if op-auto was not found or failed
    try:
        res = subprocess.run(
            ["op", "read", op_reference],
            capture_output=True,
            text=True,
            check=True
        )
        token = res.stdout.strip()
        if token:
            print("🔑 Authenticated using Hugging Face token from 1Password (op CLI).")
            return token
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    return None

def main():
    parser = argparse.ArgumentParser(description="Deploy Space to Hugging Face under HCAI-Lab.")
    parser.add_argument("--org", default="HCAI-Lab", help="Hugging Face organization name (default: HCAI-Lab)")
    parser.add_argument("--name", default="capabilibara", help="Space repository name (default: capabilibara)")
    parser.add_argument("--space-dir", default="hf_space", help="Path to space files directory (default: hf_space)")
    parser.add_argument("--sdk", choices=["gradio", "static"], default="gradio", help="Space SDK type (default: gradio)")
    parser.add_argument("--token", default=os.getenv("HF_TOKEN"), help="Hugging Face User Access Token (or HF_TOKEN env var)")
    args = parser.parse_args()

    repo_id = f"{args.org}/{args.name}"
    space_path = Path(args.space_dir).resolve()

    token = get_hf_token(args.token)

    if not space_path.exists():
        print(f"Error: Space directory '{space_path}' does not exist.", file=sys.stderr)
        sys.exit(1)

    try:
        from huggingface_hub import HfApi
    except ImportError:
        print("Error: 'huggingface_hub' is not installed. Run with 'uv run --with huggingface_hub python scripts/deploy_hf_space.py'", file=sys.stderr)
        sys.exit(1)

    api = HfApi(token=token)

    print(f"🚀 Deploying Hugging Face Space to '{repo_id}' (SDK: {args.sdk})...")

    # Step 1: Create repository if it doesn't exist
    try:
        api.create_repo(
            repo_id=repo_id,
            repo_type="space",
            space_sdk=args.sdk,
            private=False,
            exist_ok=True
        )
        print(f"✅ Space repository '{repo_id}' is ready.")
    except Exception as e:
        print(f"⚠️ Note when ensuring repo exists: {e}")

    # Step 2: Upload folder
    print(f"📦 Uploading contents from '{space_path}'...")
    try:
        api.upload_folder(
            folder_path=str(space_path),
            repo_id=repo_id,
            repo_type="space",
            commit_message=f"Deploy Capabilibara Space under {args.org}"
        )
        print(f"🎉 Successfully deployed Space! View it live at: https://huggingface.co/spaces/{repo_id}")
    except Exception as e:
        print(f"❌ Upload failed: {e}", file=sys.stderr)
        print("Tip: Make sure HF_TOKEN is set or run `hf auth login` with permissions for the HCAI-Lab org.", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
