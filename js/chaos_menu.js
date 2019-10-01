function hasAnyGrandchildren(tree) {
  let newTree = [];
  let length = tree.length;

  for (let i = 0; i < length; i++) {
    const node = tree[i];
    let hasGrandchildren = false;
    if (node.children) {
      let children = this.hasAnyGrandchildren(node.children);
      children.forEach(child => {
        if (child.children && child.children.length > 0) {
          hasGrandchildren = true;
        }
      });
    }
    node.hasGrandchildren = hasGrandchildren;
    newTree.push(node);
  }
  return newTree;
}

function createTree() {
  fetch(
    histology_directory.data_directory+'/results.json'
    
  ) //"https://rampages.us/extras/cors.php?url=https://rampages.us/wp-content/themes/histology/results.json"
    .then(result => {
      result.json().then(json => {
        function parseTree(nodes, parentID) {
          let tree = [];
          let length = nodes.length;
          for (let i = 0; i < length; i++) {
            let node = nodes[i];
            if (node.post_parent == parentID) {
              let children = parseTree(nodes, node.ID);

              //if (children.length > 0) {
                node.children = children;
              //}
              tree.push(node);
            }
          }

          return tree;
        }

        const completeTree = parseTree(json, "0");
        const annotatedTree = this.hasAnyGrandchildren(completeTree);
        this.tree = annotatedTree;
        //console.log(annotatedTree)
        publishTree(annotatedTree);
        return annotatedTree;
      });
    });
}

function publishTree(tree) {
  var menu = "";
  tree.forEach(function(item) {
    //console.log(item)
    if (item.hasGrandchildren === true) {
      menu = menu.concat("<li><h2>" + item.post_title) + "</h2>";
      menu = menu.concat('<div class="cell-chaos-index">');
      menu = menu.concat(makeLimb(item.children, "childbearing top"));
      menu.concat("</li>");
      menu = menu.concat("</div>");
      limbMenu = "";
    }
  });
  jQuery(menu).appendTo("#chaos ul");
  stunLinks();
  checkUrl();
  specialAddition();
}

var limbMenu = "";

function makeLimb(data, type) {
  limbMenu = limbMenu.concat("<ul>");
  data.forEach(function(item) {
    if (item.hasGrandchildren === true) {
      limbMenu = limbMenu.concat(
        '<li><a id="menu_' +
          item.ID +
          '" class="grandchildbearing ' +
          type +
          '" href="' +
          item.guid +
          '">' +
          overviewClean(item.post_title) +
          //ifParent(item.hasGrandchildren) +
          "</a>"
      );
      makeLimb(item.children, 'childbearing');
      limbMenu = limbMenu.concat("</li>");
    }
    if (item.children && !item.hasGrandchildren) {
    	if (item.has_children == 'true'){
    		var status = 'childbearing'
    	} if (item.has_children == 'false') {
    		var status = 'end'
    	} else {
    		var status = 'childbearing'
    	}
      limbMenu = limbMenu.concat(
        '<li><a class="live '+status+'" href="' +
          item.guid +
          '">' +
          overviewClean(item.post_title) +
          "</a>"
      );
      makeLimb(item.children, "live");
    } //this is super ugly but this appears to be the only item that violates the pattern
    if (
      //item.post_title == "Overview of connective tissues" ||
      item.post_title == "Comparison"
    ) {
      //console.log(item.post_title + ' foo')
      limbMenu = limbMenu.concat(
        '<li><a class="live" href="' +
          item.guid +
          '">' +
          overviewClean(item.post_title) +
          "</a>"
      );
    }
  });
  limbMenu = limbMenu.concat("</ul>");
  return limbMenu;
}

function ifParent(kids) {
  if (kids === true) {
    return '<i class="fa fa-arrow-right"></i>';
  } else {
    return "";
  }
}

createTree();

function overviewClean(title) {
  var regex = /overview/i;
  var found = title.match(regex);
  if (found === null) {
    return title;
  } else {
    return title.substring(0, 8);
  }
}

function stunLinks() {
  jQuery(".childbearing").click(function(e) {
    e.preventDefault();
    jQuery(".active").removeClass("active");
    jQuery(this)
      .parent()
      .children("ul")
      .toggleClass("active");
    jQuery(this)
      .parentsUntil(".cell-chaos-index")
      .addClass("active");
      let links = this.parentNode.querySelectorAll('.end');
      console.log(links)
      let travelLinks = [];
      links.forEach(function(link){
        travelLinks.push(link+'/#hidden')
      })
      let  randomLinks = shuffle(travelLinks);
      localStorage.setItem('random-list',randomLinks);
      localStorage.setItem('random-list-page-number', 0)
      window.location.href = get_random(links).href+'/#hidden'
  });
}


//from https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

get_random = function (list) {
  return list[Math.floor((Math.random()*list.length))];
} 


function checkUrl() {
  var id = getQueryVariable("menu");
  //console.log(id)
  //console.log('menu thing')
  if (id) {
    jQuery("#" + id)
      .parent()
      .children("ul")
      .addClass("active");
    //console.log(jQuery('#'+id));
    //console.log('foo')
    jQuery("#" + id)
      .parents()
      .addClass("active");
  }
}
//from https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function specialAddition() {
  if (document.getElementById("menu_325")) {
    var exocrine = document.getElementById("menu_325");
    var parent = exocrine.parentElement.parentElement;

    var node = document.createElement("li"); // Create a <li> node
    var a = document.createElement("a"); // Create a text node
    a.setAttribute("href", "https://rampages.us/histology/?menu=menu_212");
    a.textContent = "Endocrine ";
    node.appendChild(a); // Append the text to <li>
    parent.appendChild(node);
    a.innerHTML = a.innerHTML;
  }
}

//from https://eureka.ykyuen.info/2015/04/08/javascript-add-query-parameter-to-current-url-without-reload/
function updateURL(id) {
  if (history.pushState) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?menu=" +
      id;
    window.history.pushState({ path: newurl }, "", newurl);
  }
}
