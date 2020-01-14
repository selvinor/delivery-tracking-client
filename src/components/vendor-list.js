import React from 'react';
import Vendor from './vendor-list';

export default function VendorList(props) {

  // This component has these responsibilities:
  //    1)  Show today's Vendors 
  //    2)  change vendor status from pending to ready and back
  //    3)  delete Vendor from list
  //    4)  select and show Vendor detail   

const vendors = props.vendors;
return (
      <div>
        <h3>Vendors</h3>
        <ul className="vendor-list">
          {vendors.map((vendor, index) => (
            <Vendor
              key={index}
              index={index}
              vendor={vendor}
            />
          ))}
        </ul>
      </div>
    );
}
