# 🔧 Authentication Issue - How to Fix

## ⚠️ Problem:
You're logged in as `PusprajKumar000` but trying to push to `1uciferm0rningstar/CipherStudio`

## ✅ Solutions:

### **Option 1: Update Git Credentials (Recommended)**

```bash
# Clear cached credentials
git credential-manager erase https://github.com

# Or use Git Credential Manager
git config --global credential.helper manager-core

# Then try push again (it will prompt for login)
git push -u origin main
```

When prompted:
- **Username:** `1uciferm0rningstar`
- **Password:** Your Personal Access Token (NOT your GitHub password)

### **Option 2: Use Personal Access Token**

1. **Create Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: ✅ `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push with Token:**
```bash
# Format: https://TOKEN@github.com/username/repo.git
git remote set-url origin https://YOUR_TOKEN@github.com/1uciferm0rningstar/CipherStudio.git

# Then push
git push -u origin main
```

### **Option 3: Use GitHub CLI (Easiest)**

```bash
# Install GitHub CLI if not installed
# Download from: https://cli.github.com/

# Login
gh auth login

# Push
git push -u origin main
```

### **Option 4: Use SSH (Advanced)**

```bash
# Change to SSH URL
git remote set-url origin git@github.com:1uciferm0rningstar/CipherStudio.git

# Push
git push -u origin main
```

## 🚀 Quick Fix Commands:

**Run these in order:**

```bash
# 1. Remove origin
git remote remove origin

# 2. Add origin with your token
git remote add origin https://YOUR_PERSONAL_ACCESS_TOKEN@github.com/1uciferm0rningstar/CipherStudio.git

# 3. Push
git push -u origin main
```

## 📝 Create Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "CipherStudio Upload"
4. Expiration: 90 days (or No expiration)
5. Select scopes: **✅ repo**
6. Click "Generate token"
7. **COPY THE TOKEN** (looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`)

## 💡 What Happened?

Your local Git is configured with credentials for `PusprajKumar000`, but you're trying to push to `1uciferm0rningstar`'s repository.

## ✅ Recommended Steps:

1. Create Personal Access Token (see above)
2. Run these commands:

```bash
cd "c:\Users\lenovo\Desktop\Web Dev\codeEditor\vscode-clone"

git remote remove origin

git remote add origin https://YOUR_TOKEN@github.com/1uciferm0rningstar/CipherStudio.git

git push -u origin main
```

Replace `YOUR_TOKEN` with the actual token you copied!

---

**Let me know when you have your Personal Access Token, and I'll run the commands for you!**
