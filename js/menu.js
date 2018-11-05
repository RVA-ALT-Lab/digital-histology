var app = new Vue({
    el: '#app',
    data: {
        tree: []
    },
    computed: {
        annotatedTree: function () {
            return this.hasAnyGrandchildren(this.tree)
        }
    },
    methods: {
        hasAnyGrandchildren: function (tree) {
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
        },
        createTree: function () {
            fetch( histology_directory.data_directory+'/results.json')
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
                    console.log(annotatedTree)
                })
            })
        }
    },
    mounted: function () {
        this.createTree()
        console.log(this.annotatedTree)
    }
})

Vue.component('child-component', {
    template : `<li>
                <a v-if="!child.children" v-bind:href="child.guid">{{child.post_title}}</a>
                <a v-if="child.children" class="childbearing" v-if="child.hasGrandchildren" v-bind:href="child.guid" v-bind:id="child.post_name+child.ID">{{child.post_title}}<i class="fa fa-arrow-right"></i></a>
                <a v-if="!child.hasGrandchildren" v-bind:href="child.children[0].guid">{{child.post_title}}</a>
            <ul v-if="child.children && child.hasGrandchildren">
                <child-component v-for="grandchild in child.children" :key="grandchild.ID" :child="grandchild">
                </child-component>
            </ul>

            </li>`,
    props: ['child']
})
