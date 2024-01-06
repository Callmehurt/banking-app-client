import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import CustomerAddModal from "./CustomerAddModal";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import DataTable from "react-data-table-component";
import TableLoader from '../loader/TableLoader'

const CustomerList = () => {

    const customers = useSelector((state) => state.customers.availableCustomers);
    const dispatch = useDispatch();


    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if(customers){
            setSearchResults(customers);
        }
    }, [customers]);

    useEffect(() => {
        const options = {
            includeScore: true,
            keys: ['name', 'email', 'phone', 'address']
        }

        const fuse = new Fuse(customers, options);
        const result = fuse.search(search);
        search ? setSearchResults(result.map((data) => data.item)) : setSearchResults(customers);
    }, [search]);


    const columns = [
        {
            name: 'Full Name',
            cell: row => (
                <span>{row.name}</span>
            ),
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone
        },
        {
            name: 'Address',
            selector: row => row.address
        },
        {
            name: 'Email',
            selector: row => row.email
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <button className={'btn btn-sm btn-primary'}>Edit</button>
                <button className={'btn btn-sm btn-danger ml-1'}>Delete</button>
                </>
            )
        }
    ]

    const nextIcon = <FontAwesomeIcon icon={faArrowRight} />;
    const prevIcon = <FontAwesomeIcon icon={faArrowLeft} />;

    const customStyles = {
        headCells: {
          style: {
              background: '#222437',
              fontSize: '14px',
              fontWeight: '500',
              textTransform: 'uppercase',
              color: 'white'
          }
        },
    }

    const [show, setShow] = useState(false);

    return (
        <>
        <CustomerAddModal show={show} setShow={setShow} />
        <DataTable
                title={'Available Customer List'}
                columns={columns}
                data={searchResults}
                pagination={true}
                paginationPerPage={50}
                paginationRowsPerPageOptions={[50, 100, 150]}
                paginationIconNext={nextIcon}
                paginationIconPrevious={prevIcon}
                responsive={true}
                striped={true}
                highlightOnHover={true}
                pointerOnHover={true}
                persistTableHead={true}
                fixedHeader={true}
                subHeader={true}
                subHeaderComponent={
                <div className="dataTables_filter">
                    <button onClick={() => setShow(true)} style={{position: 'absolute', left: '15px'}} className={'btn btn-primary'}>
                        <FontAwesomeIcon icon={faPlusCircle} className={'mr-1'}/>Add New Customer</button>
                    <label>
                        <input type="search"
                               className={'form-control form-control-sm'}
                               placeholder={'Search..'}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                </div>
                }
                subHeaderAlign={'right'}
                customStyles={customStyles}
			    progressComponent={<TableLoader />}
            />
        </>
    )
}

// progressPending={isLoading}

export default CustomerList;