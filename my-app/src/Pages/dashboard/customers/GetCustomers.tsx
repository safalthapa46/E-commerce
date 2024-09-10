import React from 'react'
import useSWR from 'swr'
import { getAllUser } from '../../../api/userApi'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'


const GetCustomer = () => {
  
  const {data : Users} =useSWR(`/users`, getAllUser)
  console.log(Users)
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent products..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Users?.map((user, idx) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{user.userDetail.firstName}</TableCell>
              <TableCell>{user.userDetail.lastName}</TableCell>
              <TableCell>{user.userDetail.address}</TableCell>
              <TableCell>{user.userDetail.gender}</TableCell>
              <TableCell>{user.userDetail.phoneNumber}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default GetCustomer
