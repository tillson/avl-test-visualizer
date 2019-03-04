rm ../avl-homework-build/*
rm -rf ../avl-homework-build/static
yarn build
mv ./build/* ../avl-homework-build/
cd ../avl-homework-build
mv index.html index.php
echo "Ready for deployment."
