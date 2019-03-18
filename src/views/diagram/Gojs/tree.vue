
<template>
  <div id="sample">
    <diagram ref="diag"
             v-bind:model-data="diagramData"
             v-on:model-changed="modelChanged"
             v-on:changed-selection="changedSelection"
             style="border: solid 1px black; width:100%; height:600px"></diagram>
   
  </div>
</template>
<script>
import diagram from "./statechart";
 
export default{
  data() {
    return {
       diagramData: {  // passed to <diagram> as its modelData
        //  class: "go.GraphLinksModel",
          nodeKeyProperty: "id",
          nodeDataArray: [
            { "id": 0, "loc": "120 120", "text": "Initial" },
            { "id": 1, "loc": "330 120", "text": "First down" },
            { "id": 2, "loc": "226 376", "text": "First up" },
            { "id": 3, "loc": "60 276", "text": "Second down" },
            { "id": 4, "loc": "226 226", "text": "Wait" }
          ],
          linkDataArray: [
            { "from": 0, "to": 0, "text": "up or timer", "curviness": -20 },
            { "from": 0, "to": 1, "text": "down", "curviness": 20 },
            { "from": 1, "to": 0, "text": "up (moved)\nPOST", "curviness": 20 },
            { "from": 1, "to": 1, "text": "down", "curviness": -20 },
            { "from": 1, "to": 2, "text": "up (no move)" },
            { "from": 1, "to": 4, "text": "timer" },
            { "from": 2, "to": 0, "text": "timer\nPOST" },
            { "from": 2, "to": 3, "text": "down" },
            { "from": 3, "to": 0, "text": "up\nPOST\n(dblclick\nif no move)" },
            { "from": 3, "to": 3, "text": "down or timer", "curviness": 20 },
            { "from": 4, "to": 0, "text": "up\nPOST" },
            { "from": 4, "to": 4, "text": "down" }
          ]

        }
    }
  },
  components: {
        diagram,
  },
  computed: {
        // currentNodeText: {
        //     get: function() {
        //     var node = this.currentNode;
        //     if (node instanceof go.Node) {
        //         return node.data.text;
        //     } else {
        //         return "";
        //     }
        //     },
        //     set: function(val) {
        //     var node = this.currentNode;
        //     if (node instanceof go.Node) {
        //         var model = this.model();
        //         model.startTransaction();
        //         model.setDataProperty(node.data, "text", val);
        //         model.commitTransaction("edited text");
        //     }
        //     }
        // }
},
 
  methods: {
    // get access to the GoJS Model of the GoJS Diagram
        model: function() { return this.$refs.diag.model(); },
        // tell the GoJS Diagram to update based on the arbitrarily modified model data
        updateDiagramFromData: function() { this.$refs.diag.updateDiagramFromData(); },
        // this event listener is declared on the <diagram>
        modelChanged: function(e) {
          if (e.isTransactionFinished) {  // show the model data in the page's TextArea
                  console.log( e.model.toJson())

            this.savedModelText = e.model.toJson();
          }
        },
         changedSelection: function(e) {
          var node = e.diagram.selection.first();
          if (node instanceof go.Node) {
            this.currentNode = node;
            this.currentNodeText = node.data.text;
            this.NodeKey=node.key;
          } else {
            this.currentNode = null;
            this.currentNodeText = "";
          }
        },
        // Here we modify the GoJS Diagram's Model using its methods,
        // which can be much more efficient than modifying some memory and asking
        // the GoJS Diagram to find differences and update accordingly.
        // Undo and Redo will work as expected.
        // addNode: function() {
        //   var model = this.model();
        //   model.startTransaction();
        //   model.setDataProperty(model.findNodeDataForKey(4), "color", "purple");
        //   var data = { text: "NEW " + this.counter++, color: "yellow" };
        //   model.addNodeData(data);
        //   model.addLinkData({ from: this.NodeKey, to: model.getKeyForNodeData(data) });
        //   model.commitTransaction("added Node and Link");
        //   // also manipulate the Diagram by changing its Diagram.selection collection
        //   var diagram = this.$refs.diag.diagram;
        //   diagram.select(diagram.findNodeForData(data));
        // },
        // Here we modify VUE's view model directly, and
        // then ask the GoJS Diagram to update everything from the data.
        // This is less efficient than calling the appropriate GoJS Model methods.
        // NOTE: Undo will not be able to restore all of the state properly!!
        // modifyStuff: function() {
        //   var data = this.diagramData;
        //   data.nodeDataArray[0].color = "red";
        //   // Note here that because we do not have the GoJS Model,
        //   // we cannot find out what values would be unique keys, for reference by the link data.
        //   data.nodeDataArray.push({ key: ++this.counter2, text: this.counter2.toString(), color: "orange" });
        //   data.linkDataArray.push({ from: 2, to: this.counter2 });
        //   this.updateDiagramFromData();
        // }
  }
}
</script>