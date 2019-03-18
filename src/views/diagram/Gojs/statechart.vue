
<template>
  <div id="diagramDiv"></div>
</template>
<script>
export default {
  props: ["modelData"],
  data() {
    return {
      diagram: null
    };
  },
  mounted() {
    var $MAKE = go.GraphObject.make;
    var myDiagram = $MAKE(go.Diagram, 'diagramDiv', {
      padding: 20,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      "clickCreatingTool.archetypeNodeData": { text: "new node" },
      "undoManager.isEnabled": true,
      layout: $MAKE(go.TreeLayout, { angle: 0, layerSpacing: 35 })
    });

    myDiagram.nodeTemplate = 
      $MAKE(go.Node,'Auto', { selectionChanged: this.nodeSelectionChanged },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $MAKE(go.Shape, "RoundedRectangle",
          {
            parameter1: 20,
            fill: '#c8c7c7',
            stroke: null,
            portId: "",  
            fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
            toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
            cursor: "pointer"
          },
          new go.Binding("fill", 'data', function(data) { return data.linkList || data.formula || data.remark ? $MAKE(go.Brush, "Linear", { 0: "rgb(254, 201, 0)" }) : $MAKE(go.Brush, "Linear", { 0: "rgb(254, 162, 0)" }) }).ofObject()
        ),
        $MAKE(go.TextBlock,
          {
            font: "bold 11pt helvetica, bold arial, sans-serif",
            editable: true  // editing the text automatically updates the model data
          },
          new go.Binding("text").makeTwoWay())
    );
    
    myDiagram.nodeTemplate.selectionAdornmentTemplate = $MAKE(
      go.Adornment,
      "Spot",
      $MAKE(
        go.Panel,
        "Auto",
        $MAKE(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
        $MAKE(go.Placeholder) // a Placeholder sizes itself to the selected Node
      ),
      // the button to create a "next" node, at the top-right corner
      $MAKE(
        "Button",
        {
          alignment: go.Spot.Top,
          click: this.addNodeAndLink // this function is defined below
        },
        $MAKE(go.Shape, "PlusLine", { width: 6, height: 6 })
      ),
      $MAKE(
        "ContextMenuButton",
        {
          alignment: go.Spot.Bottom,
          click: this.nodeButtonSelection
        },
        $MAKE(go.Shape, 'TriangleDown', { width: 7, height: 5, fill: null })
      ),
    );

    myDiagram.linkTemplate = $MAKE(
      go.Link, // the whole link panel
      {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: true,
        relinkableFrom: true,
        relinkableTo: true,
        toShortLength: 3
      },
      new go.Binding("points").makeTwoWay(),
      new go.Binding("curviness"),
      $MAKE(
        go.Shape, // the link shape
        { strokeWidth: 1.5 }
      ),
      $MAKE(
        go.Shape, // the arrowhead
        { toArrow: "standard", stroke: null }
      ),
      $MAKE(
        go.Panel,
        "Auto",
        $MAKE(
          go.Shape, // the label background, which becomes transparent around the edges
          {
            fill: $MAKE(go.Brush, "Radial", {
              0: "rgb(255, 255, 255)",
              0.3: "rgb(255, 255, 255)",
              1: "rgba(255, 255, 255, 0)"
            }),
            stroke: null
          }
        ),
        $MAKE(
          go.TextBlock,
          "transition", // the label text
          {
            textAlign: "center",
            font: "9pt helvetica, arial, sans-serif",
            margin: 4,
            editable: true // enable in-place editing
          },
          // editing the text automatically updates the model data
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    myDiagram.commandHandler.archetypeGroupData = {
      key: "Group",
      isGroup: true,
      color: "blue"
    };
    myDiagram.groupTemplate.ungroupable = true;
    this.diagram = myDiagram;
    this.updateModel(this.modelData);
  },
  watch: {
    modelData(val) {
      this.updateModel(val);
    }
  },
  methods: {
    nodeSelectionChanged(node,data) {
      let bool = node.isSelected ? true : false
      this.$emit('nodeSelectionChanged',node,bool)
    },

    nodeButtonSelection(e, obj) {
      this.$emit('nodeButtonSelection', e, obj)
    },

    addNodeAndLink(e, obj) {
      var adornment = obj.part;
      var diagram = e.diagram;
      diagram.startTransaction("Add State");
      var fromNode = adornment.adornedPart;
      var fromData = fromNode.data;
      var toData = { text: "new" };
      var p = fromNode.location.copy();
      p.x += 200;
      toData.loc = go.Point.stringify(p);
      var model = diagram.model;
      model.addNodeData(toData);

      var linkdata = {
        from: model.getKeyForNodeData(fromData), 
        to: model.getKeyForNodeData(toData),
        text: "transition"
      };
      model.addLinkData(linkdata);

      var newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      diagram.commitTransaction("Add State");
      diagram.scrollToRect(newnode.actualBounds);
    },

    updateModel(val) {
      if (val instanceof go.Model) {
        this.diagram.model = val;
      } else {
        var m = new go.GraphLinksModel();
        if (val) {
          for (var p in val) {
            m[p] = val[p];
          }
        }
        this.diagram.model = m;
      }
    },

    updateDiagramFromData() {
      this.diagram.startTransaction();
      this.diagram.updateAllRelationshipsFromData();
      this.diagram.updateAllTargetBindings();
      this.diagram.commitTransaction("updated");
    },

    model() {
      return this.diagram.model;
    },
    
    selectAll() {
      this.diagram.commandHandler.selectAll();
    },
    undo() {
      this.diagram.commandHandler.undo();
    },
    redo() {
      this.diagram.commandHandler.redo();
    },
    pasteSelection() {
      this.diagram.commandHandler.pasteSelection();
    },
    copySelection() {
      this.diagram.commandHandler.copySelection();
    },
    cutSelection() {
      this.diagram.commandHandler.cutSelection();
    },
    stopCommand() {
      this.diagram.commandHandler.stopCommand();
    },
    deleteSelection() {
      this.diagram.commandHandler.deleteSelection();
    },
    save() {
      this.diagram.isModified = false;
      return this.diagram.model.toJson();
    }
  }
};
</script>
