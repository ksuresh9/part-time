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
            columns: [],
            projectList: {},
            months: []
        }
        //Show only these project coloumns from json
        this.columnsToShow = ["ccsj", "PName", "length", "projectType", "letType"]
    }

    componentDidMount = () => {
        this.processData()
        this.getTable()
    }

    processData = () => {
        const data = mockData.ZYears[0].ZDates
        let columns = []
        let monthList = []
        let projects = {}

        data.map(month => {
            monthList.push(month.ZDate)
            projects[month.ZDate] = month.projects
        })

        for (let key in data[0].projects[0]) {
            if (this.columnsToShow.includes(key)) {
                let clm = {}
                clm.title = key.charAt(0).toUpperCase() + key.slice(1)
                clm.field = key
                clm.headerSort = true
                clm.align = 'center'
                clm.headerFilter = 'input'
                clm.headerFilterPlaceholder = 'search...'
                columns.push(clm)
            }
        }

        let tableData = []
        data[0].projects.map(row => tableData.push(row))

        this.setState({ tableData, columns, projectList: projects, months: monthList })
    }

    getTable = (table) => {
        this.setState({ table })
    }

    buttonClickHandler = event => {
        let tableData = []
        this.state.projectList[event.target.value].map(row => tableData.push(row))
        this.setState({ tableData }, () => this.state.table.replaceData(tableData))
    }

    displayButtons = () => {
        let months = this.state.months.map(month => <div class="p-2"><button id={month} onClick={this.buttonClickHandler} value={month} className="btn btn-primary">{month}</button></div>)
        return this.state.months && <div className="d-flex flex-wrap">{months}</div>
    }

    render() {
        return (<div>
            <br />
            {this.displayButtons()}
            <br />
            { this.state.tableData.length > 0 && <Table data={this.state.tableData} columns={this.state.columns} getTable={this.getTable} />}
        </div>);
    }
}