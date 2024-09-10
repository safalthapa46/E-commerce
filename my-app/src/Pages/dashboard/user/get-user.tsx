import React from 'react'
import useSWR from 'swr'
// import { getAllUser } from '../../../API/userApi'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'
import { getAllUser } from '../../../api/userApi'

const UserPage = () => {
  const {data: users} = useSWR('/users', getAllUser)
  console.log(users)
  return (
    <div>
    <div className='my-2 flex justify-between container'>
      <h1 className='text-2xl font-bold'>All Users</h1>
      </div>
       <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.N</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead> 
          <TableHead>Phone</TableHead> 
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, idx) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium text-center">{idx + 1}</TableCell>
            <TableCell>{user.userDetail.firstName}</TableCell>
            <TableCell>{user.userDetail.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userDetail.phoneNumber}</TableCell>
            <TableCell>{user.userDetail.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
   
  )
}

export default UserPage