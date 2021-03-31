import React, { Component } from 'react';
import Table from './table'
import mockData from '../mockData.json'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            table: "",
            tableData: [],
            columns: []
        }
    }

    componentDidMount = () => {
        this.processData()
    }

    processData = () => {
        const data = mockData.fiYears[0].lDates[0].projects
        console.log('Data:', data)
        let columns = [ ]

        for(let key in data[0]){
            let clm = {}
            clm.title = key
            clm.field = key
            clm.headerSort = true
            clm.align = 'center'
            clm.headerFilter = 'input'
            clm.headerFilterPlaceholder = 'search...'
            columns.push(clm)
        }

        let tableData = []
        data.map(row=>tableData.push(row))

        this.setState({ tableData, columns })
    }

    componentWillUnmount() {
        clearInterval(this.myTimmer)
    }

    getTable = (table) => {
        this.setState({ table })
    }

    render() {
        return (<div>
            <br />
            { this.state.tableData.length > 0 && <Table data={this.state.tableData} columns={this.state.columns} getTable={this.getTable} />}
        </div>);
    }
}