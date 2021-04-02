import React, { Component } from 'react';
import Table from './table'
import mockData from '../mockData.json'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            table: "",
            tableData: [],
            columns: [],
            projectList: {},
            months: [],
            title: ''
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
        this.setState({ tableData, columns, projectList: projects, months: monthList, title: data[0].ZDate })
    }

    getTable = (table) => {
        this.setState({ table })
    }

    buttonClickHandler = event => {
        let tableData = []
        this.state.projectList[event.target.value].map(row => tableData.push(row))
        this.setState({ tableData, title: event.target.value }, () => this.state.table.replaceData(tableData))
    }

    displayButtons = () => {
        let months = this.state.months.map(month => <div className="p-2"><button id={month} key={month} onClick={this.buttonClickHandler} value={month} className="btn btn-primary">{month}</button></div>)
        return this.state.months && <div className="d-flex flex-wrap">{months}</div>
    }

    perPageHandler = event => {
        let val = event.target.value
        if (val && val !== 'all') {
            this.state.table.setPageSize(parseInt(val));
        }
        else if (val === 'all') {
            this.state.table.setPageSize(this.state.tableData.length);
        }
    }

    render() {
        return (<div>
            <br />
            {this.displayButtons()}
            <br />
            <div className="d-flex justify-content-between">
                <div className="p-2">
                    <h5>Project List : {this.state.title}</h5>
                </div>
                <div className="p-2">
                    <b>Page Size</b>
                    <select id="sel2" onChange={this.perPageHandler}>
                        <option key='1' value='1'>1</option>
                        <option key='3' value='3'>3</option>
                        <option key='5' value='5'>5</option>
                        <option key='10' value='10' selected>10</option>
                        <option key='all' value='all'>All</option>
                    </select>
                </div>
            </div>
            <div >
                {this.state.tableData.length > 0 && <Table data={this.state.tableData} columns={this.state.columns} getTable={this.getTable} />}
            </div>
        </div>);
    }
}