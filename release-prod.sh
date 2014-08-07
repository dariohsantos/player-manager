mv index.php index.dev.php
sed '0,/development/s/development/production/' index.dev.php > index.php
rm index.dev.php