var heredoc = require('heredoc');

var sassConfig = heredoc(function () {/*
http_path = "/"
css_dir = "public/css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "public/js"

# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
*/});

exports.sass = sassConfig;