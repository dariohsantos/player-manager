mv index.php index.dev.php
sed '0,/development/s/development/production/' index.dev.php > index.php
rm index.dev.php

mv .htaccess .htaccess.dev
sed '/RewriteBase/d' .htaccess.dev > .htaccess
rm .htaccess.dev


chmod -R 777 assets/cache/
chmod -R 777 assets/uploads/