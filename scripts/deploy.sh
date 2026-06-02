#!/usr/bin/env bash
# Rebuild et publie le site sur la branche gh-pages (deploiement manuel).
set -e
cd "$(dirname "$0")/.."
npm run build
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="Hedi Benjahouach" -c user.email="hedi.hbji@gmail.com" commit -qm "Deploy site"
git push -q --force https://github.com/benjhedi/benjhedi.github.io.git gh-pages
echo "Deploye : https://benjhedi.github.io"
