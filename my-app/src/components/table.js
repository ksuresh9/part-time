import React from 'react'
import Tabulator from 'tabulator-tables';

export default class Table extends React.Component {

    constructor(props) {
        super(props);
    }
    refreshTable = () => {
        console.log('T Data:',this.props.data)
        console.log('T columns:',this.props.columns)
        const opts = {
            data: this.props.data,
            headerSort: false,
            layout: 'fitColumns',
            responsiveLayout: 'hide',
            tooltips: false,
            addRowPos: 'top',
            history: false,
            pagination: "local",
            paginationSize: 10,
            movableColumns: false,
            resizableRows: false,
            columns: this.props.columns,
            placeholder: "No Data Available"
        }

        let table = new Tabulator("#table", opts)
        this.props.getTable(table)
    }

    componentDidMount() {
        this.refreshTable()
    }

    render() {
        return (
            < div data-testid="table">
                <div id="table"></div>
            </div >
        )
    }

}
