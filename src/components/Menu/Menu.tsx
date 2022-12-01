import React, {useContext, useState} from 'react';

import {Functionality} from './Functionality';
import {Filter} from './Filter';
import {ContextButtonHide} from "../Context/ContextButtonHide";

import './styles/Menu.scss';

type Props = {
  onChangeImageView: (state: boolean) => void,
  onCategoryButton: (state: boolean) => void,
  handleOnFilter: ({name, status}: any) => void,
  handleOnSettingsFields: (state: boolean) => void,
  handleOnChangeDublicateButton: (state: boolean) => void,
  handleOnClear: () => void,
  handleOnCategoryManagementChange: () => void,
  uniqueNameItems: string[],
  handleOnCheckbox: (item: string) => void,
  headers: string[]
}

export const Menu: React.FC<Props> = ({
                                        onChangeImageView,
                                        onCategoryButton,
                                        handleOnFilter,
                                        handleOnSettingsFields,
                                        handleOnChangeDublicateButton,
                                        handleOnClear,
                                        uniqueNameItems,
                                        handleOnCategoryManagementChange,
                                        handleOnCheckbox,
                                        headers
                                      }) => {
  const {hideButton} = useContext(ContextButtonHide);

  return (
    <>
      <div className='menu__functionality'>
        <Functionality
          onCategoryButton={onCategoryButton}
          onChangeImageView={onChangeImageView}
          handleOnSettingsFields={handleOnSettingsFields}
          handleOnChangeDublicateButton={handleOnChangeDublicateButton}
          handleOnFilter={handleOnFilter}
          handleOnCategoryManagementChange={handleOnCategoryManagementChange}
          handleOnClear={handleOnClear}
          handleOnCheckbox={handleOnCheckbox}
          headers={headers}
        />
      </div>

      {!hideButton && (
        <div className="menu__filter filter">
          <Filter
            handleOnFilter={handleOnFilter}
            handleOnClear={handleOnClear}
            uniqueNameItems={uniqueNameItems}
          />
        </div>
      )}
    </>
  );
};