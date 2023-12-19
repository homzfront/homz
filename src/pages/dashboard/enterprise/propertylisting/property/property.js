import React from 'react'
import ToggleReturn from '../../estates/components/Return';
import Widget from './widget';

const Property = () => {
    return (
        <div className="w-[1075px] p-8">
          <div>
            <div>
              <ToggleReturn
                first={"Go Back"}
                second={"Property Name"}
                third={"Property Details"}
                href2={"/dashboard/enterprise-property/propertylisting"}
                href3={""}
                href1={""}
              />
            </div>
            <div><Widget /></div>
          </div>
        </div>
      );
}

export default Property