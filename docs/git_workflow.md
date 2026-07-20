# Git Workflow — routine_clicker

## First time setup (do once)
git clone https://github.com/YOUR_USERNAME/routine_clicker.git
cd routine_clicker

---

## Every time you sit down to code

### 1. Fetch latest changes first (always do this before coding)
git fetch origin
git pull origin main

### 2. Switch to your branch (or create it)

# switch to existing branch
git checkout feature/calendar-grid

# create a new branch off main
git checkout -b feature/firebase-setup

### 3. Pull main into your branch (in case main updated since you branched)
git pull origin main

---

## While coding — save your work regularly

git add .
git commit -m "describe what you did here"
git push origin feature/your-branch-name

---

## When your feature is done

Go to github.com → routine_clicker → open a Pull Request → assign someone to review → merge into main.

---

## Quick Reference

| What you want to do          | Command                          |
|------------------------------|----------------------------------|
| See what branch you're on    | git status                       |
| See all branches             | git branch -a                    |
| Switch branch                | git checkout branch-name         |
| Get latest from main         | git pull origin main             |
| Save changes locally         | git add . && git commit -m "msg" |
| Push to GitHub               | git push origin branch-name      |