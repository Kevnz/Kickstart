var heredoc = require('heredoc');

var styleTemplate = heredoc(function () {/*
body {
  font-family: sans-serif;
  color: #777;
}
.header {
  min-height: 80px;
  margin: 0;
  color: #fff;
  padding: 50px 20px 30px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.header h1 {
  margin: 0.2em 0;
  font-size: 3em;
  color: #4d4d4d;
  font-weight: 100;
}
.header h2 {
  font-weight: 300;
  margin: 0;
  color: #b8b8b8;
}
h1, h2, h3, h4, h5, h6 {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", sans-serif;
  font-weight: 300;
}
.content {
  margin: 0 auto;
  width: 70%;
  margin-bottom: 50px;
}
.content h1 {
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}
.content h2 {
  color: #4b4b4b;
  margin: 50px 0 20px 0;
  font-weight: bold;
}
.content p {
  line-height: 1.6em;
  font-size: 115%;
}
#headerMenu, #headerMenu ul {
  background: #111;
}
#headerMenu a:hover {
  background: #222;
  border-color: #222;
}
#headerMenu a {
  color: #fff;
  text-shadow: none;
}
#headerMenu .yui3-menu-active {
  background: #222;
}

@media (max-width: 767px) { 
  #headerMenu {
    position: relative;
  }
  #headerMenu ul {
    text-align: center;
  }
 
  #headerMenu a {
    font-size: 80%;
  }
 
  .content {
    width: 95%;
  }
}
*/});

exports.styles = styleTemplate;