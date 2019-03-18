
<template>
  <div >
  
  </div>
</template>
<script>


export default{
  props: ["modelData"], 
  data() {
    return {
       diagram: null,
    }
  },
  mounted(){
    var $ = go.GraphObject.make;
    var self = this;
    var myDiagram =
        $(go.Diagram, this.$el,
        {
            initialContentAlignment: go.Spot.Center,
            layout: $(go.TreeLayout, { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal }),
            "undoManager.isEnabled": true,
            // Model ChangedEvents get passed up to component users
            "ModelChanged": function(e) { self.$emit("model-changed", e); },
            "ChangedSelection": function(e) { self.$emit("changed-selection", e); }
        });
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
        $(go.Shape,
        {
            fill: "white", strokeWidth: 0,
            portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
        },
        new go.Binding("fill", "color")),
        $(go.TextBlock,
            { margin: 8, editable: true },
            new go.Binding("text").makeTwoWay())
        );
    myDiagram.linkTemplate =
        $(go.Link,
        { relinkableFrom: true, relinkableTo: true },
        $(go.Shape),
        $(go.Shape, { toArrow: "OpenTriangle" })
        );
    this.diagram = myDiagram;
    this.updateModel(this.modelData);

    myDiagram.addDiagramListener("ObjectDoubleClicked", function(e,obj) {
        console.log(e)
        console.log(obj)
    }) ;
    
  },
  watch: {
    modelData: function(val) { this.updateModel(val); }
  },
  methods: {
    model: function() { return this.diagram.model; },
    updateModel: function(val) {
        // No GoJS transaction permitted when replacing Diagram.model.
        if (val instanceof go.Model) {
        this.diagram.model = val;
        } else {
        var m = new go.GraphLinksModel()
        if (val) {
            for (var p in val) {
            m[p] = val[p];
            }
        }
        this.diagram.model = m;
        }
    },
    updateDiagramFromData: function() {
        this.diagram.startTransaction();
        // This is very general but very inefficient.
        // It would be better to modify the diagramData data by calling
        // Model.setDataProperty or Model.addNodeData, et al.
        this.diagram.updateAllRelationshipsFromData();
        this.diagram.updateAllTargetBindings();
        this.diagram.commitTransaction("updated");
    },
      // enable or disable a particular button
  

  }

}
</script>
