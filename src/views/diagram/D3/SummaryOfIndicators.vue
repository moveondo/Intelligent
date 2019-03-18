<template>
  <div id="app" class="container-fluid">
    <div class="col-md-3">
      <div class="panel panel-default">
        <div class="panel-heading">Props</div>
        <div class="panel-body">
            <div class="form-horizontal">
            <div class="form-group">
              <label for="type" class="control-label col-sm-3">type</label>
                <div  class="col-sm-9">
                  <select id="type" class="form-control" v-model="type">
                    <option>tree</option>
                    <option>cluster</option>
                  </select>
                </div>
            </div>

            <div class="form-group">
              <label for="layout-type" class="control-label col-sm-3">layoutType</label>
                <div  class="col-sm-9">
                  <select id="layout-type" class="form-control" v-model="layoutType">
                    <option>euclidean</option>
                    <option>circular</option>
                  </select>       
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>

  <div class="col-md-9 panel panel-default">
    <tree ref="tree" :data="Graph.tree" :node-text="nodeText"   :type="type" :layout-type="layoutType" :duration="duration" class="tree" @clicked="onClick" @expand="onExpand" @retract="onRetract"/>
  </div>
  
  </div>
</template>

<script>
import tree from './Tree'
import data from './data.json'
// import {getGremlin} from './gremlinConfiguration'
Object.assign(data, {
  type: 'tree',
  layoutType: 'euclidean',
  duration: 1000,
//   Marginx: 30,
//   Marginy: 30,
//   radius: 3,
  nodeText: 'text',
  currentNode: null,
//   zoomable: true,
  isLoading: false,
  isUnderGremlinsAttack: false,
//   events: []
})
export default {
  data () {
    return data
  },
  components: {
    tree
  },
  methods: {
    do (action) {
      if (this.currentNode) {
        this.isLoading = true
        this.$refs['tree'][action](this.currentNode).then(() => { this.isLoading = false })
      }
    },
    getId (node) {
      return node.id
    },
    expandAll () {
      this.do('expandAll')
    },
    collapseAll () {
      this.do('collapseAll')
    },
    showOnly () {
      this.do('showOnly')
    },
    show () {
      this.do('show')
    },
    onClick (evt) {
      this.currentNode = evt.element
      this.onEvent('onClick', evt)
    },
    onExpand (evt) {
      this.onEvent('onExpand', evt)
    },
    onRetract (evt) {
      this.onEvent('onRetract', evt)
    },
    onEvent (eventName, data) {
        console.log(eventName,data.data);
      this.events.push({eventName, data: data.data})
    },
    resetZoom () {
      if (!this.$refs['tree']) {
        return
      }
      this.isLoading = true
      this.$refs['tree'].resetZoom().then(() => { this.isLoading = false })
    },
    // gremlins () {
    //   if (this.isUnderGremlinsAttack) {
    //     this.horde.stop()
    //     return
    //   }
    //   this.duration = 20
    //   const changeLayout = () => { this.type = (this.type === 'tree') ? 'cluster' : 'tree' }
    //   const changeType = () => { this.layoutType = (this.layoutType === 'euclidean') ? 'circular' : 'euclidean' }
    //   const resetZoom = this.resetZoom.bind(this)
    //   const [treeDiv] = this.$el.getElementsByClassName('tree')
    //   const [gremlinsButton] = this.$el.getElementsByClassName('btn-danger')
    //   var horde = getGremlin(gremlinsButton, treeDiv, changeType, changeLayout, resetZoom)
    //   horde.after(() => { this.isUnderGremlinsAttack = false })
    //   horde.unleash()
    //   this.horde = horde
    //   this.isUnderGremlinsAttack = true
    // }
  }
}
</script>

<style lang="less" scoped>
.tree {
  height: 600px;
  width: 100%;
}
.graph-root {
  height: 800px;
  width: 100%;
}
.feedback{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
}
.log  {
  height: 200px;
  overflow-x: auto;
  overflow-y: auto;
  overflow: auto;
  text-align: left;
}
</style>