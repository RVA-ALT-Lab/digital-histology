var app = new Vue({
    el: '#app',
    data: {
        tree: []
    },
    methods: {
        createTree: function () {
            fetch('./results.json')
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
                    this.tree = completeTree
                    console.log(completeTree)
                })
            })
        }
    },
    mounted: function () {
        this.createTree()
    }
})

Vue.component('child-component', {
    template : `<li>
            <div v-if="child.children">
                <a v-if="child.children[0].children" v-bind:href="child.guid">{{child.post_title}}</a>
                <a v-if="!child.children[0].children" v-bind:href="child.children[0].guid">{{child.post_title}}</a>
            </div>
            <ul v-if="child.children && child.children[0].children">
                <child-component v-for="grandchild in child.children" :key="grandchild.ID" :child="grandchild">
                </child-component>
            </ul>

            </li>`,
    props: ['child']
})
