
<template>
  <div >
    <!-- <button id="SaveButton" @click="save">Save</button> -->
  
     <div>
      
      <p>{{'Diagram Model saved in JSON format'}}</p> 
    </div>
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
    var $MAKE = go.GraphObject.make;
    var self_this = this;
    // console.log(this.$MAKEel);
    var myDiagram =
      $MAKE(go.Diagram, this.$el,
        {
          padding: 20,
          // when the user drags a node, also move/copy/delete the whole subtree starting with that node
          "commandHandler.copiesTree": true,
          "commandHandler.deletesTree": true,
          "draggingTool.dragsTree": true,
          initialContentAlignment: go.Spot.Center,  // center the whole graph
          layout: $MAKE(go.TreeLayout, {angle:0, layerSpacing: 35 } ),
           "undoManager.isEnabled": true,
            // Model ChangedEvents get passed up to component users
           "ModelChanged": function(e) { self_this.$emit("model-changed", e); },
           "ChangedSelection": function(e) { self_this.$emit("changed-selection", e); }
        });
    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
    // a node consists of some text with a line shape underneath
    myDiagram.nodeTemplate =
      $MAKE(go.Node, 
        { selectionObjectName: "TEXT" },
        $MAKE(go.TextBlock,
          {
            name: "TEXT",
            editable: true,
             textAlign: "center",
             font: "10pt helvetica, arial, sans-serif",
             stroke: "#919191",
             margin: 2,
             minSize: new go.Size(1, NaN),
          },
          // remember not only the text string but the scale and the font in the node data
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("scale", "scale").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay()),
        // $MAKE(go.Shape, "LineH",
        //   {
        //     // figure: "RoundedRectangle", fill: "lightgreen",
        //     stretch: go.GraphObject.Horizontal,
        //     strokeWidth: 3, height: 3,stroke: null,
        //     // this line shape is the port -- what links connect with
        //     portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
        //   },
        //   new go.Binding("stroke", "brush"),
        //   // make sure links come in from the proper direction and go out appropriately
        //   new go.Binding("fromSpot", "dir", function(d) { return this.spotConverter(d, true); }),
        //   new go.Binding("toSpot", "dir", function(d) { return this.spotConverter(d, false); })
        //   ),
//          $MAKE(go.Shape,  // 箭头
//             { toArrow: "Standard", stroke: "red" }),
         $MAKE(go.Panel, "Auto",
            new go.Binding("visible", "isSelected").ofObject()),
       
           // remember the locations of each node in the node data
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          //make sure text "grows" in the desired direction
          new go.Binding("locationSpot", "dir", function(d) { return this.spotConverter(d, false); })
      );
    // selected nodes show a button for adding children
    myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $MAKE(go.Adornment, "Spot",
        $MAKE(go.Panel, "Auto",
          // this Adornment has a rectangular blue Shape around the selected node
          $MAKE(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
          $MAKE(go.Placeholder, { margin: new go.Margin(4, 4, 0, 4) })
        ),
        // and this Adornment has a Button to the right of the selected node
        $MAKE("Button",
          {
            alignment: go.Spot.Right,
            alignmentFocus: go.Spot.Left,
            click: self_this.addNodeAndLink  // define click behavior for this Button in the Adornment
          },
          $MAKE(go.TextBlock, "+",  // the Button content
            { font: "bold 8pt sans-serif" })
        )
      );
      // the context menu allows users to change the font size and weight,
    // and to perform a limited tree layout starting at that node
    myDiagram.nodeTemplate.contextMenu =
      $MAKE(go.Adornment, "Horizontal",
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Bigger"),
          { click: function(e, obj) { self_this.changeTextSize(obj, 1.1); } }),
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Smaller"),
          { click: function(e, obj) { self_this.changeTextSize(obj, 1/1.1); } }),
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Bold/Normal"),
          { click: function(e, obj) { self_this.toggleTextWeight(obj); } }),
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Addlink"),
          { click: function(e, obj) { self_this.addlink(obj); } })
      );
       var linkSelectionAdornmentTemplate =
       $MAKE(go.Adornment, "Link",
          $MAKE(go.Shape,
            // 声明此形状共享链接。
            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // 使用选择对象的频宽
        ); 
    // a link is just a Bezier-curved line of the same color as the node to which it is connected
    myDiagram.linkTemplate =
      $MAKE(go.Link,
        { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
        { relinkableFrom: true, relinkableTo: true, reshapable: true },
        {
             curve: go.Link.AvoidsNodes,
            // curve: go.Link.JumpOver,
        //    curve: go.Link.Bezier,
            fromShortLength: -2,
            toShortLength: -2,
            corner: 5,
            selectable: false
        },
        $MAKE(go.Shape,
           { strokeWidth: 3 },
          new go.Binding("stroke", "toNode", function(n) {
            if (n.data.brush) return n.data.brush;
            return "black";
          }).ofObject())
      );

     myDiagram.contextMenu =
      $MAKE(go.Adornment, "Vertical",
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Undo"),
          { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
          new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canUndo(); }).ofObject()),
        $MAKE("ContextMenuButton",
          $MAKE(go.TextBlock, "Redo"),
          { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
          new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canRedo(); }).ofObject()),
        // $MAKE("ContextMenuButton",
        //   $MAKE(go.TextBlock, "Save"),
        //   { click: function(e, obj) { self_this.save(); } })
      );
    myDiagram.addDiagramListener("SelectionMoved", function(e) {
      var rootX = myDiagram.findNodeForKey(0).location.x;
      myDiagram.selection.each(function(node) {
          if (node.data.parent !== 0) return; // Only consider nodes connected to the root
          var nodeX = node.location.x;
          if (rootX < nodeX && node.data.dir !== "right") {
            self_this.updateNodeDirection(node, "right");
          } else if (rootX > nodeX && node.data.dir !== "left") {
            self_this.updateNodeDirection(node, "left");
          }
          self_this.layoutTree(node);
        });
    });
    myDiagram.commandHandler.archetypeGroupData = {key:"Group",isGroup:true,color:"blue" };
    myDiagram.groupTemplate.ungroupable = true;

    this.diagram = myDiagram;
    this.updateModel(this.modelData);

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
        var m = new go.TreeModel()
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
    selectAll(){
         this.diagram.commandHandler.selectAll();
    },
     undo(){
         this.diagram.commandHandler.undo();
    },
     redo(){
         this.diagram.commandHandler.redo();
    },
     pasteSelection(){
         this.diagram.commandHandler.pasteSelection();
    },
     copySelection(){
         this.diagram.commandHandler.copySelection();
    },
     cutSelection(){
         this.diagram.commandHandler.cutSelection();
    },
     stopCommand(){
         this.diagram.commandHandler.stopCommand();
    },
    deleteSelection(){
         this.diagram.commandHandler.deleteSelection();
    },
    save() {
    // document.getElementById("mySavedModel").value = this.myDiagram.model.toJson();
      console.log("可以调接口保存哦");
      this.diagram.isModified = false;
   },
    addNodeAndLink(e, obj) {
    var adorn = obj.part;
    var diagram = adorn.diagram;
    diagram.startTransaction("Add Node");
    var oldnode = adorn.adornedPart;
    var olddata = oldnode.data;
    // copy the brush and direction to the new node data
    var newdata = { text: "idea", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
    diagram.model.addNodeData(newdata);
    this.layoutTree(oldnode);
    diagram.commitTransaction("Add Node");
    // if the new node is off-screen, scroll the diagram to show the new node
    var newnode = diagram.findNodeForData(newdata);
    if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
  },
    layoutTree(node) {
    if (node.data.key === 0) {  // adding to the root?
      this.layoutAll();  // lay out everything
    } else {  // otherwise lay out only the subtree starting at this parent node
      var parts = node.findTreeParts();
      this.layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
    }
  },
  addlink(obj){
    var adorn = obj.part;
    var node = adorn.adornedPart;
    var tb = node.findObject("TEXT");
    console.log(tb.text,node.key);
    // this.$router.push("/mreport/myreport");
  },
  changeTextSize(obj, factor) {
    var adorn = obj.part;
    adorn.diagram.startTransaction("Change Text Size");
    var node = adorn.adornedPart;
    var tb = node.findObject("TEXT");
    tb.scale *= factor;
    adorn.diagram.commitTransaction("Change Text Size");
  },
  toggleTextWeight(obj) {  
    var adorn = obj.part;
    adorn.diagram.startTransaction("Change Text Weight");
    var node = adorn.adornedPart;
    var tb = node.findObject("TEXT");
    // assume "bold" is at the start of the font specifier
    var idx = tb.font.indexOf("bold");
    if (idx < 0) {
      tb.font = "bold " + tb.font;
    } else {
      tb.font = tb.font.substr(idx + 5);
    }
    adorn.diagram.commitTransaction("Change Text Weight");
  },
  updateNodeDirection(node, dir) {
    this.diagram.model.setDataProperty(node.data, "dir", dir);
    // recursively update the direction of the child nodes
    var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node
    while(chl.next()) {
      this.updateNodeDirection(chl.value, dir);
    }
  },
  layoutAngle(parts, angle) {
    var layout = go.GraphObject.make(go.TreeLayout,
        { angle: angle,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
          nodeSpacing: 5,
          layerSpacing: 20,
          setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
          setsChildPortSpot: false });
    layout.doLayout(parts);
    },
    spotConverter(dir, from) {
        if (dir === "left") {
        return (from ? go.Spot.Left : go.Spot.Right);
        } else {
        return (from ? go.Spot.Right : go.Spot.Left);
        }
    },
    layoutAll() {
    var root = this.diagram.findNodeForKey(0);
    if (root === null) return;
    this.diagram.startTransaction("Layout");
    // split the nodes and links into two collections
    var rightward = new go.Set(go.Part);
    var leftward = new go.Set(go.Part);
    root.findLinksConnected().each(function(link) {
        var child = link.toNode;
        if (child.data.dir === "left") {
          leftward.add(root);  // the root node is in both collections
          leftward.add(link);
          leftward.addAll(child.findTreeParts());
        } else {
          rightward.add(root);  // the root node is in both collections
          rightward.add(link);
          rightward.addAll(child.findTreeParts());
        }
      });
    // do one layout and then the other without moving the shared root node
    this.layoutAngle(rightward, 0);
    this.layoutAngle(leftward, 180);
    this.diagram.commitTransaction("Layout");
  },


  }

}
</script>
