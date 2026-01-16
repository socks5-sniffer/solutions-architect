# Secret Scanning Setup

This repository is configured with pre-commit hooks that automatically scan for secrets before allowing commits.

## How It Works

The pre-commit hook uses `detect-secrets` to scan all staged files for potential secrets such as:
- API keys
- Passwords
- Private tokens
- AWS keys
- Database credentials
- SSH keys
- And more...

## Installation

The hook is already set up in `.git/hooks/pre-commit`. The `detect-secrets` package is installed in the virtual environment.

### Prerequisites

- Python 3.x
- Virtual environment activated (`.venv`)

### Manual Installation (if needed)

```bash
pip install detect-secrets
```

## Usage

The hook runs automatically when you try to commit:

```bash
git add .
git commit -m "Your commit message"
```

If secrets are detected:
- ❌ The commit will be **BLOCKED**
- You'll see which files contain potential secrets
- You must remove the secrets before committing

If no secrets are found:
- ✅ The commit proceeds normally

## Updating the Baseline

If you have legitimate high-entropy strings that are being flagged as false positives, update the baseline:

```bash
.venv/Scripts/detect-secrets.exe scan > .secrets.baseline
```

## Best Practices

1. **Never commit secrets**: Use environment variables or secret management systems
2. **Use .env.local**: Store local secrets in `.env.local` (already in .gitignore)
3. **Azure Key Vault**: For production, use Azure Key Vault or similar services
4. **Environment Variables**: Use environment variables for configuration

## Testing the Hook

To test if the hook is working:

1. Create a test file with a fake secret:
   ```bash
   echo "api_key=sk-1234567890abcdef1234567890abcdef" > test-secret.txt
   git add test-secret.txt
   git commit -m "test"
   ```

2. The commit should be blocked with a warning message

3. Remove the test file:
   ```bash
   git reset HEAD test-secret.txt
   rm test-secret.txt
   ```

## Troubleshooting

### Hook not running on Windows

If you're on Windows and the bash script doesn't work, you can use the PowerShell version:

```powershell
# Run manually
.git/hooks/pre-commit.ps1
```

### Bypass hook (NOT RECOMMENDED)

Only in emergency situations:
```bash
git commit --no-verify -m "message"
```

⚠️ **Warning**: Bypassing the hook defeats the purpose of security scanning!

## Additional Resources

- [detect-secrets documentation](https://github.com/Yelp/detect-secrets)
- [Git hooks documentation](https://git-scm.com/docs/githooks)
