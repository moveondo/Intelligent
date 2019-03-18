
<template>

<div id="sample">
      <diagram ref="diag"
             v-bind:model-data="diagramData"
             v-on:model-changed="modelChanged"
             v-on:changed-selection="changedSelection"
             style="border: solid 1px black; width:96%; height:700px;padding:20px;margin:50px 5px;"></diagram>
    <!-- <button v-on:click="addNode">Add Child to {{currentNodeText+"---"+NodeKey}}</button>
    <button v-on:click="modifyStuff">Modify view model data without undo</button> -->

  <!-- <div id="myDiagramDiv" style="border: solid 1px black; width:100%; height:300px;"></div> -->
  <!-- <button @click="load()">Load</button> -->
   <button @click="selectAll()">全选</button>
    <button  @click="undo()">撤销</button>
    <button  @click="redo()">重做</button>
    <button  @click="deleteSelection()">删除</button>
    <button  @click="pasteSelection()">黏贴</button>
    <button  @click="copySelection()">复制</button>
    <button  @click="cutSelection()">剪贴</button>
    <button  @click="stopCommand()">返回</button>
    <br />
  <textarea style="width:90%;height:400px">{{ savedModelText }}</textarea>
</div>
</template>
<script>
import diagram from "./diagramM";

export default{
  data() {
    return {
       diagramData: {  // passed to <diagram> as its modelData
         class: "go.TreeModel",
         "linkFromPortIdProperty": "fromPort",
        "linkToPortIdProperty": "toPort",
        "modelData": {"position":"0 0"},
         nodeDataArray: [
            {"key":0, "text":"Mind Map", "figure":"Circle", "fill":"#00AD5F", "loc":"0 0"},
            {"key":1, "parent":0, "text":"Getting more time", "figure":"Circle", "fill":"#00AD5F", "brush":"skyblue", "dir":"right", "loc":"77 -22"},
            {"key":11, "parent":1, "text":"Wake up early", "brush":"skyblue", "dir":"right", "loc":"200 -48"},
            {"key":12, "parent":1, "text":"Delegate", "brush":"skyblue", "dir":"right", "loc":"200 -22"},
            {"key":13, "parent":1, "text":"Simplify", "brush":"skyblue", "dir":"right", "loc":"200 4"},
            {"key":2, "parent":0, "text":"More effective use", "brush":"darkseagreen", "dir":"right", "loc":"77 43"},
            {"key":21, "parent":2, "text":"Planning", "brush":"darkseagreen", "dir":"right", "loc":"203 30"},
            {"key":211, "parent":21, "text":"Priorities", "brush":"darkseagreen", "dir":"right", "loc":"274 17"},
            {"key":212, "parent":21, "text":"Ways to focus", "brush":"darkseagreen", "dir":"right", "loc":"274 43"},
            {"key":22, "parent":2, "text":"Goals", "brush":"darkseagreen", "dir":"right", "loc":"203 56"},
            {"key":3, "parent":0, "text":"Time wasting", "brush":"palevioletred", "dir":"left", "loc":"-20 -31.75"},
            {"key":31, "parent":3, "text":"Too many meetings", "brush":"palevioletred", "dir":"left", "loc":"-117 -64.25"},
            {"key":32, "parent":3, "text":"Too much time spent on details", "brush":"palevioletred", "dir":"left", "loc":"-117 -25.25"},
            {"key":33, "parent":3, "text":"Message fatigue", "brush":"palevioletred", "dir":"left", "loc":"-117 0.75"},
            {"key":331, "parent":31, "text":"Check messages less", "brush":"palevioletred", "dir":"left", "loc":"-251 -77.25"},
            {"key":332, "parent":31, "text":"Message filters", "brush":"palevioletred", "dir":"left", "loc":"-251 -51.25"},
            {"key":4, "parent":0, "text":"Key issues", "brush":"coral", "dir":"left", "loc":"-20 52.75"},
            {"key":41, "parent":4, "text":"Methods", "brush":"coral", "dir":"left", "loc":"-103 26.75"},
            {"key":42, "parent":4, "text":"Deadlines", "brush":"coral", "dir":"left", "loc":"-103 52.75"},
            {"key":43, "parent":4, "text":"Checkpoints", "brush":"coral", "dir":"left", "loc":"-103 78.75"}
          ], 
           linkDataArray: [
            { from: 1, to: 2 ,"category":"auditedLineColor","text":"金额>1000"},
            { from: 1, to: 3 },
            { from: 3, to: 4 }
          ]
        },
        currentNode: null,
        myDiagram:'',
        NodeKey:Number,
        savedModelText:''
    }
  },
   components: {
        diagram,
  },
  computed: {
        currentNodeText: {
            get: function() {
            var node = this.currentNode;
            if (node instanceof go.Node) {
                return node.data.text;
            } else {
                return "";
            }
            },
            set: function(val) {
            var node = this.currentNode;
            if (node instanceof go.Node) {
                var model = this.model();
                model.startTransaction();
                model.setDataProperty(node.data, "text", val);
                model.commitTransaction("edited text");
            }
            }
        }
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
        console.log(this.currentNode,this.currentNodeText,this.NodeKey)
    },
    // Here we modify VUE's view model directly, and
    // then ask the GoJS Diagram to update everything from the data.
    // This is less efficient than calling the appropriate GoJS Model methods.
    // NOTE: Undo will not be able to restore all of the state properly!!
    modifyStuff: function() {
        var data = this.diagramData;
        data.nodeDataArray[0].color = "red";
        // Note here that because we do not have the GoJS Model,
        // we cannot find out what values would be unique keys, for reference by the link data.
        data.nodeDataArray.push({ key: ++this.counter2, text: this.counter2.toString(), color: "orange" });
        data.linkDataArray.push({ from: 2, to: this.counter2 });
        this.updateDiagramFromData();
    },
    selectAll(){
      this.$refs.diag.selectAll();
    },
    undo(){
      this.$refs.diag.undo();
    },
    redo(){
      this.$refs.diag.redo();
    },
    pasteSelection(){
      this.$refs.diag.pasteSelection();
    },
    copySelection(){
      this.$refs.diag.copySelection();
    },
    cutSelection(){
      this.$refs.diag.cutSelection();
    },
    stopCommand(){
      this.$refs.diag.stopCommand();
    },
    deleteSelection(){
       this.$refs.diag.deleteSelection();
    },

  }

}
</script>


