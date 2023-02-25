<template>
  <div class="page-diagram">
    <div id="mountNode"></div>
    <element-editor-drawer ref="elementEditorDrawer" @update-item="handleUpdateItem" />
  </div>
</template>

<script>
import G6 from '@antv/g6';
import ElementEditorDrawer from "~/pages/diagram/components/element-editor-drawer.vue";
let graph = {};
const DEFAULT_NODE = (id = 'node' + (new Date().getTime())) => ({
  id,
  linkPoints: {
    bottom: true,
    // ... 四个圆的样式可以在这里指定
  },
})
const DEFAULT_EDGE_STYLE = () =>({
  lineWidth: 1,
  stroke: '#dddddd'
})
export default {
  name: "diagram",
  components: {ElementEditorDrawer},
  data() {
    return {
      nodes: [
        {
          id: 'node1', // String，该节点存在则必须，节点的唯一标识
          x: 100, // Number，可选，节点位置的 x 值
          y: 200, // Number，可选，节点位置的 y 值
          linkPoints: {
            top: true,
            // ... 四个圆的样式可以在这里指定
          },
        },
        {
          id: 'node2', // String，该节点存在则必须，节点的唯一标识
          x: 300, // Number，可选，节点位置的 x 值
          y: 200, // Number，可选，节点位置的 y 值
          label: 'node2',
          linkPoints: {
            bottom: true,
            // ... 四个圆的样式可以在这里指定
          },
        },
      ],
      // 边集
      edges: [
        {
          source: 'node1', // String，必须，起始点 id
          target: 'node2', // String，必须，目标点 id
          style: DEFAULT_EDGE_STYLE(),
        },
      ],
      lastLinkPoint: null,
      currentEditingItem: null,
    }
  },
  mounted() {
    graph = new G6.Graph({
      container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      nodeStateStyles: {
        // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
        hover: {
          fillOpacity: 0.1,
          lineWidth: 2,
          linkPoints: {
            top: true,
            // ... 四个圆的样式可以在这里指定
          },
        },
      },
      edgeStateStyles: {
        hover: {
          fillOpacity: 0.1,
          lineWidth: 2,
        }
      },
      modes: {
        // 支持的 behavior
        default: ['drag-canvas', {
          type: "zoom-canvas",
          enableOptimize: true //开启性能优化
        }, 'drag-node'],
        edit: ['click-select'],
      },
    });
    graph.data({nodes: this.nodes, edges: this.edges}); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图

    graph.on('edge:click', (evt) => {
      console.log('edge:click',evt);
    });
    graph.on('node:click', (evt) => {
      console.log('node:click',evt);
      const {target:{cfg:{name = ''}}, item} = evt
      const {_cfg: {id = ''}} = item;
      if (name.includes('link-point')) {
        console.log('ist', item)
        if (this.lastLinkPoint) {
          const {_cfg: {id:_lastId = ''}} = this.lastLinkPoint;
          console.log('has lastPoint', {_lastId, id}, {...this.lastLinkPoint})
          this.handleCreatEdge(_lastId, id)
          // this.lastLinkPoint = null;
        } else {
          this.lastLinkPoint = item;
        }
      }
    });
    graph.on('node:dblclick', this.handleEditNode);
// 监听鼠标进入节点事件
    graph.on('node:mouseenter', (evt) => {
      const node = evt.item;
      // 激活该节点的 hover 状态
      graph.setItemState(node, 'hover', true);
    });
// 监听鼠标离开节点事件
    graph.on('node:mouseleave', (evt) => {
      const node = evt.item;
      // 关闭该节点的 hover 状态
      graph.setItemState(node, 'hover', false);
    });
// 监听鼠标离开节点事件
//     graph.on('node:drag', this.handleDragNode);
    graph.on('canvas:dblclick', this.handleCreateSingleNode)
    graph.on('edge:click', (evt) => {
      const {target:{cfg:{name = ''}}} = evt
      console.log('in', name)
    })
    graph.on('edge:mouseenter', this.handleHoverEdge)
    graph.on('edge:mouseleave', this.handleLeaveEdge)
  },
  methods: {
    handleCreateSingleNode(evt) {
      const {x = 0, y = 0} = evt;
      graph.addItem('node', {...DEFAULT_NODE(), x, y})
    },
    handleHoverEdge(evt) {
      const {target, item} = evt;
      const {cfg:{name = ''}} = target;
      console.log('in mouseenter', name);
      graph.updateItem(item, {
        // 节点的样式
        style: {
          stroke: 'blue',
          lineWidth: 10
        },
      });
    },
    handleLeaveEdge(evt) {
      const {target, item} = evt;
      const {cfg:{name = ''}} = target;
      console.log('in mouseenter', name);
      graph.updateItem(item, {
        // 节点的样式
        style: DEFAULT_EDGE_STYLE(),
      });
    },
    handleDragNode(evt) {
      const {item:{node}, x, y} = evt;
      console.log('handleDragNode', {x,y}, evt)
      graph.updateItem(node, {x,y})
    },
    handleCreatEdge(source = '', target = '') {
      console.log('handleCreatEdge', {source, target})
      graph.addItem('edge', {
        source, target,
        style: DEFAULT_EDGE_STYLE()
      })
    },
    handleEditNode(evt) {
      const {item = {}} = evt;
      console.log('node:dblclick', item)
      this.currentEditingItem = item;
      this.$refs.elementEditorDrawer.handleShowDrawer(item)
    },
    handleUpdateItem(itemModel) {
      console.log('in handleUpdateItem', itemModel)
      this.currentEditingItem?.update && this.currentEditingItem.update(itemModel)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-diagram {
  background-color: #f7f7f7;
  width: 100%;
  height: 100vh;
  #mountNode {
    background-color: rgba(65, 105, 225, 0.1);
  }
}
</style>
