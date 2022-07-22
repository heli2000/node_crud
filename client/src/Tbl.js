import "datatables.net-dt/css/jquery.dataTables.min.css";
import React, { Component } from 'react';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export class Tbl extends Component {
    /** componentDidMount() involke when object render first time*/
    componentDidMount() {
        this.$el = $(this.el);
        this.dataTable();
    }
    componentWillUnbound() {

    }
    /**componentDidUpdate() calles every time */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data.length !== this.props.data.length)
            this.dataTable();
    }
    /**add data to data table */
    dataTable(){
        this.$el.DataTable(
            {
                data: this.props.data,
                columns:[
                    {title: "User Id"},
                    {title: "Name"},
                    {title: "Password"},
                    {title: "Profession"},
                ],
                "bDestroy": true,
            } 
            );
    }
    render() {
        return <div>
            <table className="display" width="100%" ref = {el => this.el = el}></table>
        </div>
    }
}