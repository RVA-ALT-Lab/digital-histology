function hasAnyGrandchildren (tree){
    let newTree = []
            let length = tree.length

            for (let i = 0; i < length; i++) {
                const node = tree[i]
                let hasGrandchildren = false
                if (node.children){
                  let children = this.hasAnyGrandchildren(node.children)
                  children.forEach(child => {
                        if (child.children && child.children.length > 0) {
                            hasGrandchildren = true
                        }
                    })
                }
                node.hasGrandchildren = hasGrandchildren
                newTree.push(node)

            }
            return newTree
}

function createTree () {
    fetch( histology_directory.data_directory+'/results.json' ) //histology_directory.data_directory+'/results.json'
            .then(result => {
                result.json().then(json => {

                    function parseTree(nodes, parentID){
                        let tree = []
                        let length = nodes.length
                        for (let i = 0; i < length; i++){
                            let node = nodes[i]
                            if(node.post_parent == parentID){
                                let children = parseTree(nodes, node.ID)

                                if (children.length > 0) {
                                    node.children = children
                                }
                                tree.push(node)
                            }
                        }

                        return tree
                    }

                    const completeTree = parseTree(json, "0")
                    const annotatedTree = this.hasAnyGrandchildren(completeTree)
                    this.tree = annotatedTree
                    //console.log(annotatedTree)
                    publishTree(annotatedTree)
                    return annotatedTree
                })
            })
        }    


function publishTree(tree){
    var menu = ''
    tree.forEach(function(item){
    console.log(item)   
      if ( item.hasGrandchildren === true) {
            menu = menu.concat('<li><h2>' + item.post_title) + '</h2>'
            menu = menu.concat('<div class="cell-main-index">')
              menu = menu.concat(makeLimb(item.children, 'childbearing top'))
        menu.concat('</li>')  
        menu = menu.concat('</div>')
        limbMenu = ''
        }
        
    })
     jQuery(menu).appendTo( "#app ul" );
     stunLinks()
     checkUrl()
}

var limbMenu = ''


function makeLimb(data, type){
    limbMenu = limbMenu.concat('<ul>')
    data.forEach(function(item){
            if (item.hasGrandchildren === true){
                limbMenu = limbMenu.concat('<li><a id="menu_' + item.ID + '" class="' + type +'" href="' + item.guid + '">' + item.post_title + ifParent(item.hasGrandchildren) + '</a>')
                makeLimb(item.children, "childbearing")
                limbMenu = limbMenu.concat('</li>')
            } if (item.children && !item.hasGrandchildren) {
                limbMenu = limbMenu.concat('<li><a class="live" href="' + item.children[0].guid + '">' + item.post_title + '</a>')
                makeLimb(item.children, "live")
            } 
    })
    limbMenu = limbMenu.concat('</ul>') 
    return limbMenu
}



function ifParent(kids){
    if (kids === true){
        return '<i class="fa fa-arrow-right"></i>'
    } else {
        return ""
    }
}


createTree();


function stunLinks(){
    jQuery(".childbearing").click(function (e) {
      e.preventDefault(); 
      jQuery('.active').removeClass('active');
      jQuery(this).parent().children('ul').toggleClass('active');
      jQuery(this).parentsUntil('.cell-main-index').addClass('active');
    });
}



function checkUrl(){
  var id = getQueryVariable("menu");
  console.log(id)
  console.log('menu thing')
  if (id){
     jQuery('#'+id).parent().children('ul').addClass('active');
     console.log(jQuery('#'+id));
     console.log('foo')
     jQuery('#'+id).parents().addClass('active');
  }
}
//from https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
