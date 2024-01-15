import React from "react";
import moment from "moment";
import logo from '../../images/logo.png'


export const StatementPrintComponent = React.forwardRef((props, ref) => {
    const getPageMargins = () => {
        return `
        @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }
      
      @page {
        size: auto;
        margin: 5mm;
      }
        
        `;
      };

  const getTableStyle = () => {
      return `
      table, td, th {
      border: 1px solid black;
      font-family: Roboto, Helvetica, Arial, sans-serif;
  }

  thead tr th{
      padding: 5px;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      text-align: center;
  }

  tbody tr td{
      padding-left: 5px;
      font-family: Roboto, Helvetica, Arial, sans-serif;
  }

  table {
      width: 100%;
      border-collapse: collapse;
  }

  thead{
      background: gainsboro;
  }

  .table-top-head{
      text-align: center;
      height: 35px;
      width: 170px;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: grid;
      place-items: center;
      border: 1px solid gainsboro;
      color: black;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: none;
  }
      `
  }

  return (
    <>
    
    <div ref={ref} className="receipt-print-component">
        <style type="text/css" media="print">
            {
                getPageMargins()
            }
            {
                getTableStyle()
            }
        </style>
        <div>
            <div style={{width: '100%', marginTop: '8px', height: '50px', display: 'grid', placeItems: 'center', marginBottom: '15px'}} >
                    <div style={{height: '50px', width: '50px', borderRadius: '50%', overflow: 'hidden'}}>
                        <img src={logo} style={{height: '100%', width: '100%'}} alt=""/>
                    </div>
                    <h6>ABC Banking - Statement</h6>
                </div>
            <table style={{ marginTop: '35px' }}>
                <thead>
                <tr>
                    <th>S.N</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Transaction Date</th>
                </tr>
                </thead>
                <tbody>
                    {
                        props.transactions.map((data, index) => {
                            return (
                                <tr key={data._id}>
                                    <td>{++index}</td>
                                    <td><span className={data.type === 'credit' ? 'text-success': 'text-danger'}>{data.type.toUpperCase()}</span></td>
                                    <td>£{parseFloat(data.amount).toFixed(2)}</td>
                                    <td>{moment(data.createdAt).format('MMM Do YYYY, h:mm:ss a')}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
})