# Environment Variables Setup for Cricket Chat UI

## ✅ Setup Complete!

Your React components now use environment variables from the `.env` file.

---

## 📁 File Structure:

```
ui/
├── .env                    # ✅ Your API keys (gitignored)
├── .env.example            # ✅ Template for others
├── build.js                # ✅ Custom build script
├── package.json            # ✅ Updated to use build.js
└── src/
    ├── common/
    │   └── PlayerImage.jsx # ✅ Uses process.env.REACT_APP_RAPIDAPI_KEY
    ├── PlayerInfo/
    │   └── PlayerImage.jsx # ✅ Uses process.env.REACT_APP_RAPIDAPI_KEY
    └── PlayerNews/
        └── NewsImage.jsx   # ✅ Uses process.env.REACT_APP_RAPIDAPI_KEY
```

---

## 🔑 How It Works:

### 1. **Source Code (`.jsx` files)**
```javascript
// Uses environment variable reference
'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || 'fallback_key'
```

### 2. **Build Time (`npm run build`)**
```javascript
// build.js reads .env file
// esbuild replaces process.env.REACT_APP_RAPIDAPI_KEY with actual value
// Output: "x-rapidapi-key": "your_actual_api_key_here"
```

### 3. **Compiled Bundle (`.js` files)**
```javascript
// The actual API key is embedded in the bundle
"x-rapidapi-key": "your_actual_api_key_here"
```

---

## ⚠️ Important Notes:

### **React Environment Variables are NOT Secret!**

1. **The API key WILL be visible** in the compiled JavaScript bundles
2. **Users CAN see it** in browser DevTools
3. **This is normal for frontend code** - there's no way to hide it

### **Why This Setup is Still Useful:**

1. ✅ **`.env` is gitignored** - Your key won't be in git history
2. ✅ **Easy to change** - Update `.env`, rebuild, done
3. ✅ **Team collaboration** - Share `.env.example`, each developer uses their own key
4. ✅ **Different environments** - Use `.env.development`, `.env.production`

---

## 🔒 For True Security (Production):

### **Option 1: Backend Proxy (Recommended)**

Create an endpoint in your Python server:

```python
# routes.py
@app.get("/api/image/{image_id}")
async def proxy_image(image_id: str):
    """Proxy images through backend to hide API key"""
    import httpx
    api_key = os.getenv('RAPIDAPI_KEY')
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c{image_id}/i.jpg",
            headers={
                "X-RapidAPI-Key": api_key,
                "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
            }
        )
        return Response(content=response.content, media_type="image/jpeg")
```

Then in React:
```javascript
// Call your backend instead of RapidAPI directly
const response = await fetch(`/api/image/${faceImageId}`);
```

### **Option 2: Domain Restrictions**

Configure your RapidAPI key to only work from specific domains:
- Development: `localhost`
- Production: `your-domain.com`

---

## 📝 Workflow:

### **Development:**
```bash
# 1. Update .env if needed
vi ui/.env

# 2. Rebuild
cd ui
npm run build

# 3. Restart server
cd ..
python -m uvicorn server:app --reload
```

### **Production:**
```bash
# 1. Set production env vars
echo "REACT_APP_RAPIDAPI_KEY=your_prod_key" > ui/.env.production

# 2. Build for production
cd ui
NODE_ENV=production npm run build

# 3. Deploy
```

---

## 🎯 Quick Reference:

| Location | Contains API Key? | Gitignored? |
|----------|------------------|-------------|
| `ui/.env` | ✅ Yes | ✅ Yes |
| `ui/.env.example` | ❌ No (template) | ❌ No |
| `ui/src/**/*.jsx` | ❌ No (uses `process.env`) | ❌ No |
| `ui/dist/**/*.js` | ✅ Yes (compiled) | ✅ Yes (should be) |
| `.env` (root) | ✅ Yes (Python) | ✅ Yes |

---

## ✅ Security Checklist:

- [x] `.env` files are in `.gitignore`
- [x] `.env.example` created (no real keys)
- [x] Source code uses `process.env.*` variables
- [x] Build script injects environment variables
- [x] `ui/dist/*.js` bundles are gitignored
- [ ] Consider backend proxy for production (optional)
- [ ] Rotate API key if it was committed to git

---

## 🚀 You're All Set!

Your React app now properly uses environment variables. Just remember:
- **Frontend API keys are always visible to users**
- **This is normal and expected**
- **For sensitive operations, use backend APIs**

Happy coding! 🏏
