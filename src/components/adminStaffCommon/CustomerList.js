import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import CustomerAddModal from "./CustomerAddModal";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import DataTable from "react-data-table-component";
import TableLoader from '../loader/TableLoader'
import CustomerEditModal from "./CustomerEditModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { fetchCustomers } from "../../redux/actions/customer-action";
import {notifyError, notifySuccess} from '../toastNotification'
import { Link } from "react-router-dom";


const CustomerList = () => {

    const customers = useSelector((state) => state.customers.availableCustomers);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();



    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    useEffect(() => {
        if(customers){
            setSearchResults(customers);
        }
    }, [customers]);

    useEffect(() => {
        const options = {
            includeScore: true,
            keys: ['name', 'email', 'phone', 'address', 'accountNumber']
        }

        const fuse = new Fuse(customers, options);
        const result = fuse.search(search);
        search ? setSearchResults(result.map((data) => data.item)) : setSearchResults(customers);
    }, [search]);

    const deleteCustomer = async (customer) => {
        try {
            const response = await axiosPrivate.delete(`/customer/${customer._id}/delete`)
            if(response.status === 200){
                notifySuccess(response.data.message)
                const newData = [...customers]
                newData.splice(newData.indexOf(customer), 1)
                dispatch(fetchCustomers(newData))
            }
        }catch (e){
            notifyError(e.response.data.message)
            console.log(e)
        }
   }


    const handleCustomerEdit = (customerId) => {
        const customer = customers.find((data) => data._id === customerId);
        setSelectedCustomer(customer);
        setEditShow(true);
    }


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
            name: 'Account Number',
            selector: row => row.accountNumber
        },
        {
            name: 'Action',
            cell: row => (
                <>
                <button className={'btn btn-sm btn-primary'} onClick={() => handleCustomerEdit(row._id)}>Edit</button>
                <button className={'btn btn-sm btn-danger ml-1'} onClick={() => deleteCustomer(row)}>Delete</button>
                <Link to={`/system/account/${row.accountNumber}/detail`} className="btn btn-sm btn-primary ml-1">View Account</Link>
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
    const [editShow, setEditShow] = useState(false);

    return (
        <>
        <CustomerAddModal show={show} setShow={setShow} />
        <CustomerEditModal show={editShow} setShow={setEditShow} selectedCustomer={selectedCustomer}/>
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