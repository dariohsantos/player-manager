
echo "reseting git"
git reset --hard
echo "reset finished"

echo "pulling changes"
git pull
echo "changes pulled"


echo "updating config files"
mv index.php index.dev.php
sed '0,/development/s/development/production/' index.dev.php > index.php
rm index.dev.php

mv .htaccess .htaccess.dev
sed '/RewriteBase/d' .htaccess.dev > .htaccess
rm .htaccess.dev
echo "config files updated"

echo "seting permissions in folders"
chmod -R 777 assets/cache/
chmod -R 777 assets/uploads/
chmod -R 777 players/
echo "set permisions finished"