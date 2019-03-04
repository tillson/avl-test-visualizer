import React from 'react';
import * as d3 from "d3";

class AVLTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeObject: props.treeObject,
            name: props.name,
            d3tree: null,
            svg: null,
            width: null,
            height: null,
        };
    }

    render() {
        return (
            <div className={"svg-container avl-tree-" + this.state.name}>
                {/* Height: {this.state.height} */}
                <br />
                {/* Width: {this.state.maxWidth} */}
                <br />
                <svg className={"avl-svg-" + this.state.name} width={this.props.width} height={this.props.height}>
                </svg>
            </div>
        )
    }

    loadAVLInfo() {
        // console.log(this.state.dataArray);
        // const avlArray = this.state.dataArray;
        // if (!avlArray) {
        //     return;
        // }
        // this.setState({
        //     height: avlArray[0].height + 1,
        //     maxWidth: Math.pow(2, avlArray.length - 1)
        // })
    }

    fitParentContainer() {
        // if (this.state.width && this.state.height) {
        //     this.state.d3tree.size([this.state.width, this.state.height])
        // }
    }

    componentDidMount() {
        this.fitParentContainer()
        window.addEventListener('resize', this.fitParentContainer)
        this.drawTree();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.fitParentContainer)
    }


    drawTree() {
        console.log('drawing');
        var data = this.state.treeObject;
        console.log(data);
        var root = d3.hierarchy(data)
        var treeLayout = d3.tree();
        treeLayout.size([this.props.width, this.props.height]);
        treeLayout(root);
        this.setState({ d3tree: treeLayout, width: this.props.width, height: this.props.height });

        const svg = d3.select('.avl-svg-' + this.state.name)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + this.props.width + "," + this.props.height)
        //class to make it responsive
        // .classed("svg-content-responsive", true);
        svg.append("rect")
            .attr("width", this.props.width)
            .attr("height", this.props.width)
            .attr("fill", "#212121");
        this.setState({ svg: svg });
        // Nodes
        var nodeEnter = svg
            .selectAll('circle.node')
            .data(root.descendants())
            .enter();
        nodeEnter.append('circle')
            .classed('node', true)
            .style("fill", function (d) { return (d.data.name.indexOf('*') == 0 ? '#c1272d' : '#1f77b4'); })
            .attr('cx', function (d) { return d ? d.x : 0; })
            .attr('cy', function (d) { return d ? d.y + 70 : 0; })
            .attr('r', function (d) { return d.data.name ? 50 : 0 })
        nodeEnter.append("text")
            .attr('y', function (d) { return d ? d.y + 70 : 0; })
            .attr('x', function (d) { return d ? d.x : 0; })
            .attr("dy", ".35em")
            .style('fill', 'white')
            .attr("text-anchor", "middle")
            .text(function (d) { return d ? d.data.name : ''; })
            .style("fill-opacity", 1)
            .style('font-size', '34px');

        // Height
        nodeEnter.append('circle')
            .classed('node', true)
            .style("fill", function (d) { return '#fff'; })
            .attr('cy', function (d) { return d ? d.y + 25 : 0; })
            .attr('cx', function (d) { return d ? d.x + 25 : 0; })
            .attr('r', function (d) { return d.data.height != null ? 15 : 0 })
        nodeEnter.append("text")
            .attr('y', function (d) { return d ? d.y + 25 : 0; })
            .attr('x', function (d) { return d ? d.x + 25 : 0; })
            .attr("dy", ".35em")
            .style('fill', '#000')
            .attr("text-anchor", "middle")
            .text(function (d) { return d ? d.data.height : ''; })
            .style("fill-opacity", 1)

        // Balance Factor
        nodeEnter.append('circle')
            .classed('node', true)
            .style("fill", function (d) { return '#fff'; })
            .attr('cy', function (d) { return d ? d.y + 25 : 0; })
            .attr('cx', function (d) { return d ? d.x - 25 : 0; })
            .attr('r', function (d) { return d.data.bf != null ? 15 : 0 })
        nodeEnter.append("text")
            .attr('y', function (d) { return d ? d.y + 25 : 0; })
            .attr('x', function (d) { return d ? d.x - 25 : 0; })
            .attr("dy", ".35em")
            .style('fill', '#000')
            .attr("text-anchor", "middle")
            .text(function (d) { return d ? d.data.bf : ''; })
            .style("fill-opacity", 1);



        // Declare the links…
        var link = svg.selectAll("path.link")
            .data(root.links(), function (d) { return d.target.id; });

        var diagonal = d3.linkHorizontal()
            .x(function (d) { return d.x })
            .y(function (d) { return d.y + 30 })

        // .projection(function (d) { return [d.x, d.y]; });

        link.enter().insert("path", "g")
            // .style('visibility', function (d) { return d.data ? 'visible' : 'hidden'; })
            .append("line")
            .attr("class", "link")
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y + 30; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y + 30; })
            .style("fill-opacity", 1)
            .style('fill', 'black');


    }
}

export default AVLTree;