import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";

import './styles/NewProduct.scss';
import classNames from 'classnames';


import {ReactComponent as CopyButton} from './img/copyButton.svg';
import {ReactComponent as AddPhotoIcon} from './img/addPhotoIcon.svg';
import {ReactComponent as CardIcon} from './img/cardIcon.svg';
import {ReactComponent as VendorCodeIcon} from './img/vendorCodeIcon.svg';
import {ReactComponent as UnitTypeIcon} from './img/unitTypeIcon.svg';
import {ReactComponent as ReverseCardIcon} from './img/reverseCardIcon.svg';
import {ReactComponent as Label} from './img/label.svg';
import {ReactComponent as DoubleLabel} from './img/doubleLabel.svg';
import {ReactComponent as CategoryIcon} from './img/categoryIcon.svg';
import {ReactComponent as CalendarIcon} from './img/calendarIcon.svg';
import {ReactComponent as TypeIcon} from './img/typeIcon.svg';
import {ReactComponent as SizeIcon} from './img/sizeIcon.svg';
import {ReactComponent as ArrowSquareIcon} from './img/arrowSquareIcon.svg';
import {ReactComponent as Chevron} from './img/chevron.svg';
import {ReactComponent as Description} from './img/description.svg';
import {ReactComponent as Percent} from './img/percent.svg';
import {ReactComponent as Boxes} from './img/boxes.svg';
import {ReactComponent as MinPrices} from './img/minPrice.svg';
import {ReactComponent as CloseIcon} from './img/closeIcon.svg';
import {ReactComponent as DropDownIcon} from './img/dropDownIcon.svg';
import {ReactComponent as ArrowDown} from './img/arrowDown.svg';

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import {v4 as uuidv4} from 'uuid';

import {CategoryTreeViewProduct} from "./–°ategoryTreeViewNewProduct/CategoryTreeViewNewProduct";
import {ContextNewProductCategory} from "../Context/ContextNewProductCategory";
import {ContexDropDown} from '../Context/ContexDropDown';
import {DropDown} from './DropDown';
import {PopUpVerification} from "./PopUpVerification";
import {PopUpDeleting} from "./PopUpDeleting";
import {Succes} from "../ModalWindows/SuccesWindow";
import {Deleting} from "../ModalWindows/DeletingWindow/Deleting";

type Props = {
  data: any[]
}

export const NewProduct: React.FC<Props> = ({data}): JSX.Element => {
  const [isAboutProd, setIsAboutProd] = useState(true);
  const [isHistory, setIsHistory] = useState(false);
  const [photoURL, setPhotoURL] = useState<any>(null);

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isType, setIsType] = useState(false);
  const [isUnitType, setIsUnitType] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [isBuyingPrice, setIsBuyingPrice] = useState(false);
  const [isSellingPrice, setIsSellingPrice] = useState(false);
  const [isProvider, setIsProvider] = useState(false);
  const [isSize, setIsSize] = useState(false);
  const [isMinPriceSell, setIsMinPriceSell] = useState(false);
  const [isPopUpVerification, setPopVerification] = useState(false);
  const [popVerificationValue, setPopVerificationValue] = useState(false);
  const [isSuccess, setSuccess] = useState(true)
  const [isDeletingPopUp, setDeletingPopUp] = useState(false);
  const [isDeletingPopUpNotification, setDeletingPopUpNotification] = useState(false);

  const [addedFile, setAddedFile] = useState<string[]>([]);
  const [addedFileURL, setAddedFileURL] = useState<any[]>([]);

  const [nameValue, setNameValue] = useState('');
  const [nameOnEnglishValue, setNameOnEnglishValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [maxDiscondValue, setMaxDiscondValue] = useState<any>(['%']);
  const [minSellValue, setMinSellValue] = useState<any>('‚āī');
  const [maxNDSValue, setMaxNDSValue] = useState<any>(['%']);
  const [buyingPriceValue, setBuyingPriceValue] = useState('‚āī');
  const [sellingPriceValue, setSellingPriceValue] = useState('‚āī');
  const [unitTypeValue, setUnitTypeValue] = useState('–®—ā.');
  const [providerValue, setProviderValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [sizeValue, setSizeValue] = useState('–°–ľ');
  const [volumeValue, setVolumeValue] = useState('–°–ľ3');
  const [weightValue, setWeightValue] = useState('–ö–≥');

  const navigate = useNavigate();

  const idRef = useRef<any>(null);
  const inputFileRef = useRef<any>(null);

  const handleOnClickConfirmPopUp = () => {
    setPopVerificationValue(true);
    setPopVerification(false);
  }
  const handleOnClickCancelPopUp = () => {
    setPopVerification(false);
  }

  const handleOnClickCategoryValue = (text: string) => {
    setCategoryOpen(false);
    setCategoryValue(text);
  }

  const handleOnCancelDeleting = () => {
    setDeletingPopUp(false);
  }
  const handleOnConfirmDeleting = () => {
    setDeletingPopUpNotification(true);
    setPhotoURL('');
    setDeletingPopUp(false);
  }

  const handleOnChoseDropDownValue = (value: string, dropDownName: string) => {
    switch (dropDownName) {
      case ('buyingPrice'):
        setBuyingPriceValue(value);
        break;
      case ('sellingPrice') :
        setSellingPriceValue(value);
        break;

      case ('unitType'):
        setUnitTypeValue(value);
        break;

      case ('provider'):
        setProviderValue(value);
        break;

      case ('unit'):
        setTypeValue(value);
        break;

      case ('size'):
        setSizeValue(value);
        break;

      case ('volume'):
        setVolumeValue(value);
        break;

      case ('weight'):
        setWeightValue(value);
        break;

      case ('minSellingPrice'):
        setMinSellValue(value);
        break;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
      setDeletingPopUpNotification(false);
    }, 3000)
  }, [popVerificationValue, isDeletingPopUpNotification])

  return (
    <>
      {isDeletingPopUp && <PopUpDeleting handleOnCancel={handleOnCancelDeleting} handleOnDelete={handleOnConfirmDeleting} />}
      {(popVerificationValue && isSuccess) && (<Succes/>)}
      {isDeletingPopUpNotification && <Deleting/>}
      {isPopUpVerification && <PopUpVerification handleOnConfirm={handleOnClickConfirmPopUp} handleOnCancel={handleOnClickCancelPopUp} />}
      <ContexDropDown.Provider
        value={{
          handleOnClick: handleOnChoseDropDownValue,
        }}
      >
        <input
          onChange={(event) => {
            if (event.currentTarget.files) {
              setAddedFile([...addedFile, event.currentTarget.files[0].name]);
              setAddedFileURL([...addedFileURL, event.currentTarget.files[0]]);
            }
          }}
          ref={inputFileRef}
          type="file"
          style={{display: 'none'}}
          accept="application/pdf,
        application/vnd.ms-powerpoint,
        application/vnd.openxmlformats-officedocument.presentationml.slideshow,
        application/vnd.openxmlformats-officedocument.presentationml.presentation,
         .xlsx,
          .xls,
          .doc,
          .docx,
          .ppt,
          .pptx,
          .txt,
          .pdf"
        />
        <div className='new-product--container new-product'>
          <div className="new-product__top-actions">
            <p
              onClick={() => {
                setIsAboutProd(true);
                setIsHistory(false);
              }}
              className={classNames(
                "new-product__top-actions--text",
                {"new-product__top-actions--text-active": isAboutProd}
              )}
            >
              –ě —ā–ĺ–≤–į—Ä–Ķ
            </p>
            <p
              onClick={() => {
                setIsAboutProd(false);
                setIsHistory(true);
              }}
              className={classNames(
                "new-product__top-actions--text",
                {"new-product__top-actions--text-active": isHistory}
              )}
            >
              –ė—Ā—ā–ĺ—Ä–ł—Ź –ł–∑–ľ–Ķ–Ĺ–Ķ–Ĺ–ł–Ļ
            </p>
          </div>
          <div className="new-product__main">
            <section className='new-product__left-side'>
              <div className='new-product__title'>
                <h1 className='new-product__title-main'>–Ę–ĺ–≤–į—Ä</h1>
                <div className='new-product__product-id'>
                  <span className='new-product__product-id--text'>ID —ā–ĺ–≤–į—Ä–į:</span>
                  <span ref={idRef} className='new-product__product-id--id'>23R855YK209</span>
                  <CopyButton
                    onClick={() => {
                      async function copyTextToClipboard(text: string) {
                        try {
                          await navigator.clipboard.writeText(text);
                        } catch (err) {
                          console.error('Error in copying text: ', err);
                        }
                      }

                      if (idRef) {
                        copyTextToClipboard(idRef.current.innerText)
                      }
                    }}
                  />
                </div>
              </div>
              <div className='new-product__add-photo'>
                {photoURL ? (
                  <>
                    <img className={'new-product__add-photo--photo'} src={URL.createObjectURL(photoURL)} alt=""/>
                    <div className='new-product__add-photo--actions'>
                      <div className='new-product__add-photo--actions-item'>
                        <div
                          className='new-product__add-photo--actions-item-text'
                          onClick={() => {
                            setDeletingPopUp(true);
                          }}
                        >–£–ī–į–Ľ–ł—ā—Ć
                        </div>
                      </div>

                      <div className='new-product__add-photo--actions-item'>
                        <div onClick={() => {
                        }} className='new-product__add-photo--actions-item-text'>
                          <label className='new-product__add-photo--text' htmlFor="file">
                            –ó–į–ľ–Ķ–Ĺ–ł—ā—Ć
                            <input
                              onChange={(event) => {
                                if (event.currentTarget.files) {
                                  setPhotoURL(event.currentTarget.files[0]);
                                }
                              }}
                              accept='image/*'
                              id={'file'}
                              name={'file'}
                              type="file"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={require('./img/addPhotoIcon.png')} alt=""/>
                    <label className='new-product__add-photo--text' htmlFor="file">
                      –Ē–ĺ–Ī–į–≤–ł—ā—Ć —Ą–ĺ—ā–ĺ
                      <input
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            console.log(event.currentTarget.files[0]);
                            setPhotoURL(event.currentTarget.files[0]);
                          }
                        }}
                        accept='image/*'
                        id={'file'}
                        name={'file'}
                        type="file"
                      />
                    </label>
                  </>
                )}

              </div>
              <form className='new-product__form' action="">
                <div className='new-product__form--first-input'>
                  <div>
                    <div className={'margin-bottom--wrapper'}>
                      <Label className='labelIcon'/>
                      –Ě–į–ł–ľ–Ķ–Ĺ–ĺ–≤–į–Ĺ–ł–Ķ
                    </div>
                    <input
                      value={nameValue}
                      onInput={(e) => {
                        setNameValue(e.currentTarget.value)
                      }}
                      className='new-product__input'
                      type="text"
                    />
                  </div>

                  <div>
                    <div className={'margin-bottom--wrapper'}>
                      <DoubleLabel className='labelIcon'/>
                      –Ě–į–ł–ľ–Ķ–Ĺ–ĺ–≤–į–Ĺ–ł–Ķ –Ĺ–į –į–Ĺ–≥–Ľ–ł–Ļ—Ā–ļ–ĺ–ľ
                    </div>
                    <input
                      value={nameOnEnglishValue}
                      onInput={(e) => {
                        setNameOnEnglishValue(e.currentTarget.value)
                      }}
                      className='new-product__input'
                      type="text"
                    />
                  </div>

                  <div>
                    <div className={'margin-bottom--wrapper'}>
                      <CategoryIcon className='labelIcon'/>
                      –ö–į—ā–Ķ–≥–ĺ—Ä–ł—Ź
                    </div>

                    <div className='new-product__input'>

                      <div
                        style={{color: '#000'}}
                        onClick={() => {
                          setCategoryOpen(!isCategoryOpen);
                        }}
                      >
                        {categoryValue ? (categoryValue) : ('–í—č–Ī—Ä–į—ā—Ć –ļ–į—ā–Ķ–≥–ĺ—Ä–ł—é')}
                        <DropDownIcon className='drop-down-icon'/>
                      </div>
                      {isCategoryOpen && (

                        <div
                          style={{
                            left: 0,
                            top: '100%',
                            zIndex: 100
                          }}
                          className="form__input-drop-down--wrapper"
                        >
                          <SimpleBarReact
                            style={{
                              maxHeight: '21vh'
                            }}
                          >

                            <ContextNewProductCategory.Provider
                              value={{
                                handleOnClick: handleOnClickCategoryValue,
                              }}
                            >
                              <CategoryTreeViewProduct data={data}/>
                            </ContextNewProductCategory.Provider>
                          </SimpleBarReact>

                        </div>
                      )}


                    </div>
                  </div>

                  <div className='new-product__form--fourth-group'>
                    <div style={{whiteSpace: 'nowrap'}}>
                      <CardIcon className='labelIcon'/>
                      –¶–Ķ–Ĺ–į –∑–į–ļ—É–Ņ–ļ–ł
                      <div className='new-product__form--fourth-group-inputs'>
                        <input className='new-product__form--fourth-group-inputs-input' type="number"/>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: 8,
                            boxSizing: 'border-box',
                            color: '#000'
                          }}
                          onClick={() => setIsBuyingPrice(!isBuyingPrice)}
                          className='new-product__form--fourth-group-inputs-input drop-down__position-relative'
                        >
                          {buyingPriceValue}
                          <DropDownIcon className='drop-down-icon'/>

                          {isBuyingPrice && (
                            <DropDown dropDownName={'buyingPrice'} options={['‚āī', '$', '‚ā¨']}/>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{whiteSpace: 'nowrap'}}>
                      <ReverseCardIcon className='labelIcon'/>
                      –¶–Ķ–Ĺ–į –Ņ—Ä–ĺ–ī–į–∂–ł
                      <div className='new-product__form--fourth-group-inputs'>
                        <input className='new-product__form--fourth-group-inputs-input' type="number"/>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: 8,
                            boxSizing: 'border-box',
                            color: '#000'
                          }}
                          onClick={() => setIsSellingPrice(!isSellingPrice)}
                          className='new-product__form--fourth-group-inputs-input drop-down__position-relative'
                        >
                          {sellingPriceValue}
                          <DropDownIcon className='drop-down-icon'/>

                          {isSellingPrice && (
                            <DropDown dropDownName={'sellingPrice'} options={['‚āī', '$', '‚ā¨']}/>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='new-product__form--fifth-group'>
                    <div>
                      <VendorCodeIcon className='labelIcon'/>
                      –ź—Ä—ā–ł–ļ—É–Ľ
                      <input className='new-product__form--fifth-group-input' type="number"/>
                    </div>
                    <div className={'drop-down__position-relative'} style={{whiteSpace: 'nowrap', zIndex: 15}}>
                      <UnitTypeIcon className='labelIcon'/>
                      –ē–ī. –ł–∑–ľ–Ķ—Ä–Ķ–Ĺ–ł—Ź
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: 8,
                          boxSizing: 'border-box',
                          color: '#000'
                        }}
                        onClick={() => setIsUnitType(!isUnitType)}
                        className='new-product__form--fifth-group-input drop-down__position-relative'
                      >
                        {unitTypeValue}
                        <DropDownIcon className='drop-down-icon'/>
                      </div>
                      {isUnitType && (
                        <div style={{position: "absolute", width: '100%'}}>
                          <SimpleBarReact
                            style={{
                              maxHeight: '10vh',
                            }}
                            forceVisible="y"
                            autoHide={false}
                            scrollbarMinSize={10}
                          >
                            <div style={{position: 'relative'}}>
                              <DropDown
                                dropDownName={'unitType'}
                                options={['–®—ā.', '–†—É–Ľ', '–ü–į—Ä', '–Į—Č', '–£–Ņ', '–Ď—É—ā', '–ú–Ķ—ā—Ä', '–ļ–ĺ–ľ–Ņ', '–ú', '–°–ľ', '–ú–Ķ—ā—Ä –ļ—É–Ī—Ė—á–Ĺ–ł–Ļ', '–ú–ľ', '–ú2', '–ú3', '–ú.–ü.', '–Ę', '–ö–≥', '–≥', '–ú–≥', '–õ', '–ú–Ľ']}/>
                            </div>
                          </SimpleBarReact>
                        </div>
                      )}
                    </div>

                  </div>

                  <div className='new-product__form--sixth-group'>
                    <label>
                      <input
                        checked={popVerificationValue}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                          if (popVerificationValue) {
                            e.preventDefault();
                            return;
                          }
                          setPopVerification(true)
                        }}
                        className='new-product__form--sixth-group-input'
                        type="checkbox"
                      />
                      <div className='new-product__form--sixth-group-switcher'/>
                    </label>
                    –í–Ķ—Ā—ā–ł –Ņ–į—Ä—ā–ł–Ļ–Ĺ—č–Ļ —É—á—Ď—ā
                  </div>
                </div>
              </form>
            </section>
            <section className='new-product__right-side'>
              {isAboutProd ? (
                <>
                  <div className='new-product__right-side--first-group'>
                    <div className='new-product__right-side--first-group--wrapper'>
                      <div>
                        <CalendarIcon className='labelIcon'/>
                        –ü–ĺ—Ā—ā–į–≤—Č–ł–ļ
                      </div>
                      <div
                        style={{position: 'relative'}}
                        onClick={() => setIsProvider(!isProvider)}
                        className='new-product__input new-product__right-side--first-group--input'
                      >
                        {providerValue}
                        <DropDownIcon className='drop-down-icon'/>

                        {isProvider && (

                          <div
                            style={{
                              width: '100%',
                              position: 'absolute',
                              top: '100%',
                              left: '0'
                            }}>
                            <DropDown dropDownName={'provider'} options={['–ö—Ė–Ľ', 'asd', '123', '23']}/>
                          </div>

                        )}
                      </div>
                    </div>

                    <div className='new-product__right-side--first-group--wrapper'>
                      <div>
                        <TypeIcon className='labelIcon'/>
                        –Ę–ł–Ņ
                      </div>
                      <div
                        onClick={() => setIsType(!isType)}
                        className='new-product__input new-product__right-side--first-group--input drop-down__position-relative'
                      >
                        {typeValue}
                        <DropDownIcon className='drop-down-icon'/>

                        {isType && (
                          <div
                            style={{
                              width: '100%',
                              position: 'absolute',
                              top: '100%',
                              left: '0'
                            }}>
                            <DropDown dropDownName={'unit'} options={['–ö—Ė–Ľ', 'asd', '123', '23']}/>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className='new-product__right-side--second-group'>
                    <div style={{width: '50%'}}>
                      <SizeIcon className='labelIcon'/>
                      –ď–į–Ī–į—Ä–ł—ā—č
                      <div style={{width: '98%'}} className='new-product__right-side--second-group--inputs'>
                        <input style={{width: '100%'}} placeholder='–®–ł—Ä–ł–Ĺ–į' className='new-product__input'
                               type="number"/>
                        <input style={{width: '100%'}} placeholder='–Ē–Ľ–ł–Ĺ–į' className='new-product__input'
                               type="number"/>
                        <input style={{width: '100%'}} placeholder='–í—č—Ā–ĺ—ā–į' className='new-product__input'
                               type="number"/>
                        <div
                          style={{maxWidth: '46%', minWidth: 55, color: '#000'}}
                          onClick={() => setIsSize(!isSize)}
                          placeholder='–°–ľ'
                          className='new-product__input drop-down__position-relative'
                        >
                          {sizeValue}
                          <DropDownIcon className='drop-down-icon' style={{width: 'min-content', margin: 0}}/>

                          {isSize && (
                            <div
                              style={{
                                width: '100%',
                                position: 'absolute',
                                top: '100%',
                                left: '0'
                              }}>
                              <DropDown dropDownName={'size'} options={['–ö—Ė–Ľ', 'asd', '123', '23']}/>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{width: '21.5%'}}>
                      <ArrowSquareIcon className='labelIcon'/>
                      –ě–Ī—ä—Ď–ľ
                      <div className='new-product__right-side--second-group--inputs volume'>
                        <input style={{width: '100%'}} placeholder='–ě–Ī—ä—Ď–ľ' className='new-product__input'
                               type="number"/>
                        <div style={{width: '55%', minWidth: 52, color: '#000'}} onClick={() => setIsVolume(!isVolume)}
                             className='new-product__input drop-down__position-relative volume--last-child'>
                          {/*<span>–°–ľ<sup>3</sup></span>*/}
                          {volumeValue}
                          <DropDownIcon style={{
                            position: 'absolute',
                            right: 5,
                            width: 'min-content',
                            margin: 0,
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }}/>

                          {isVolume && (
                            <div
                              style={{
                                width: '100%',
                                position: 'absolute',
                                top: '100%',
                                left: '0'
                              }}>
                              <DropDown dropDownName={'volume'} options={['–ö—Ė–Ľ', 'asd', '123', '23']}/>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{width: '26%'}}>
                      <Chevron className='labelIcon'/>
                      –ú–į—Ā—Ā–į
                      <div
                        className='new-product__right-side--second-group--inputs weight'
                      >
                        <input
                          style={{width: '80%'}}
                          placeholder='–ú–į—Ā—Ā–į'
                          className='new-product__input'
                          type="number"
                        />
                        <div style={{width: '28%', minWidth: 50, color: '#000'}} onClick={() => setIsWeight(!isWeight)}
                             placeholder='–°–ľ'
                             className='new-product__input drop-down__position-relative'>
                          {weightValue}
                          <DropDownIcon className='drop-down-icon' style={{width: 'min-content', margin: 0}}/>

                          {isWeight && (
                            <div
                              style={{
                                width: '100%',
                                position: 'absolute',
                                top: '100%',
                                left: '0'
                              }}>
                              <DropDown dropDownName={'weight'} options={['–ö—Ė–Ľ', 'asd', '123', '23']}/>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='new-product__right-side--third-group'>
                    <Description className='labelIcon'/>
                    –ě–Ņ–ł—Ā–į–Ĺ–ł–Ķ
                    <div>
                      <textarea className='new-product__right-side--third-group-textarea'></textarea>
                    </div>
                  </div>

                  <div className='new-product__right-side--fourth-group'>
                    <Description className='labelIcon'/>
                    –ö–ĺ–ľ–ľ–Ķ–Ĺ—ā–į—Ä–ł–Ļ
                    <div>
                      <textarea className='new-product__right-side--fourth-group-textarea'></textarea>
                    </div>
                  </div>

                  <div className='new-product__right-side--fifth-group'>
                    <div style={{width: '25%', whiteSpace: 'nowrap'}}>
                      <div className='new-product__right-side--fifth-group-fields-container'>
                        <Percent className='labelIcon'/>
                        –ú–į–ļ—Ā.—Ā–ļ–ł–ī–ļ–į
                      </div>
                      <div className={'new-product__input--first-container'}>
                        <input
                          value={`${maxDiscondValue.join('')}`}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (
                              e.code.toLowerCase().includes('key')
                              ||
                              e.code.toLowerCase().includes('semicolon')
                              ||
                              e.code.toLowerCase().includes('brack')
                            ) {
                              e.preventDefault()
                            } // diseable text input
                          }}
                          onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            // if (+e.currentTarget.value[e.currentTarget.value.length - 1]) {
                            //   const newValue = '';
                            //
                            //   for (let i = 0; i < e.currentTarget.value.length; i++) {
                            //     // console.log(e.currentTarget.value[i])
                            //   }
                            // }

                            if (+e.currentTarget.value.slice(0, -1) > 100) return;
                            if (e.currentTarget.value.length > 3) return;

                            // console.log(maxDiscondValue)
                            // console.log(e.currentTarget.value)

                            if (e.currentTarget.value.includes('%')) {
                              setMaxDiscondValue([e.currentTarget.value.slice(0, -1), '%']);
                              return;
                            }

                            setMaxDiscondValue([e.currentTarget.value, '%'])
                          }}
                          className='new-product__input new-product__input--first'
                          type="text"
                          max={100}
                        />
                      </div>
                    </div>

                    <div style={{width: '25%'}}>
                      <div className='new-product__right-side--fifth-group-fields-container'>
                        <Boxes className='labelIcon'/>
                        –ü–Ē–í/–Ě–Ē–°
                      </div>
                      <div>
                        <input
                          value={`${maxNDSValue.join('')}`}
                          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (
                              e.code.toLowerCase().includes('key')
                              ||
                              e.code.toLowerCase().includes('semicolon')
                              ||
                              e.code.toLowerCase().includes('brack')
                            ) {
                              e.preventDefault()
                            } // diseable text input
                          }}
                          onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            if (+e.currentTarget.value.slice(0, -1) > 100) return;
                            if (e.currentTarget.value.length > 3) return;

                            if (e.currentTarget.value.includes('%')) {
                              setMaxNDSValue([e.currentTarget.value.slice(0, -1), '%']);
                              return;
                            }

                            setMaxNDSValue([e.currentTarget.value, '%'])
                          }}
                          className='new-product__input new-product__input--second'
                          type="text"
                        />
                      </div>
                    </div>

                    <div style={{width: '35%'}}>
                      <div className='new-product__right-side--fifth-group-fields-container'>
                        <MinPrices className='labelIcon'/>
                        –ú–ł–Ĺ. —Ü–Ķ–Ĺ–į –Ņ—Ä–ĺ–ī–į–∂–ł
                      </div>
                      <div style={{display: 'flex', gap: 8}}>
                        <input className='new-product__input new-product__input--third' type="text"/>
                        {/*<input className='new-product__input new-product__input--fourth' type="text"/>*/}
                        <div
                          style={{width: '28%', minWidth: 40, color: '#000'}}
                          onClick={() => setIsMinPriceSell(!isMinPriceSell)}
                          placeholder='–°–ľ'
                          className='new-product__input drop-down__position-relative'
                        >
                          {minSellValue}
                          <DropDownIcon className='drop-down-icon' style={{width: 'min-content', margin: 0}}/>

                          {isMinPriceSell && (
                            <div
                              style={{
                                width: '100%',
                                position: 'absolute',
                                top: '100%',
                                left: '0'
                              }}>
                              <DropDown dropDownName={'minSellingPrice'} options={['‚āī', '$', '‚ā¨']}/>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{width: '25%'}} className='new-product__right-side--fifth-group--flex'>
                      <label>
                        <input className='new-product__form--sixth-group-input' type="checkbox"/>
                        <div className='new-product__form--sixth-group-switcher'></div>

                      </label>
                      –ě—ā–ľ–Ķ—ā–ł—ā—Ć –Ĺ–į —É–ī–į–Ľ–Ķ–Ĺ–ł–Ķ
                    </div>
                  </div>
                </>
              ) : (
                <table className='new-product__table'>
                  <SimpleBarReact
                    style={{
                      maxHeight: '67vh',
                    }}
                    forceVisible="y"
                    autoHide={false}
                    scrollbarMinSize={303}
                  >
                    <thead className='new-product__table-head'>
                    <tr className='new-product__table-head--tr'>
                      <th className='new-product__table-head--th'>
                        –ź–≤—ā–ĺ—Ä <ArrowDown/>
                      </th>
                      <th className='new-product__table-head--th'>
                        –ü–ĺ–Ľ–Ķ <ArrowDown/>
                      </th>
                      <th className='new-product__table-head--th'>
                        –Ď—č–Ľ–ĺ <ArrowDown/>
                      </th>
                      <th className='new-product__table-head--th'>
                        –°—ā–į–Ľ–ĺ <ArrowDown/>
                      </th>
                    </tr>
                    </thead>
                    <tbody className='new-product__table-body'>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    <tr className='new-product__table-body--tr'>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                      <td className='new-product__table-body--td'>
                        123
                      </td>
                    </tr>
                    </tbody>
                  </SimpleBarReact>
                </table>
              )}


              <div className='new-product__right-side--sixth-group'>
                {addedFile.map((item, i) => (
                  <div>
                    {addedFileURL.length > 0 && (
                      <>
                        <a target={'_blank'} href={URL.createObjectURL(addedFileURL[i])}>{item}</a>

                        <CloseIcon onClick={() => {
                          addedFile.splice(i, 1);
                          const newArr = addedFile.map(file => file);
                          setAddedFile(newArr);
                        }}/>
                      </>
                    )}

                  </div>
                ))}
              </div>

              <div className='new-product__right-side--seventh-group'>
                <div style={{width: '11%'}}>
                  <button
                    onClick={() => {
                      if (inputFileRef) {
                        inputFileRef.current.click();
                      }
                    }}
                    className='new-product__right-side--seventh-group-button new-product__right-side--seventh-group-button--litle'
                    type='button'
                  >
                    <div className='button-text'>
                      –§–į–Ļ–Ľ +
                    </div>
                  </button>
                </div>

                <div style={{width: '11%'}}>
                  <button
                    className='new-product__right-side--seventh-group-button new-product__right-side--seventh-group-button--litle'
                    type='button'>
                    <div className='button-text'>–ü–Ķ—á–į—ā—Ć</div>
                  </button>
                </div>

                <div style={{width: '37%'}}>
                  <button
                    className='new-product__right-side--seventh-group-button new-product__right-side--seventh-group-button--big'
                    type='button'>
                    <div className='button-text'>–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć –ł –ī–ĺ–Ī–į–≤–ł—ā—Ć –Ķ—Č—Ď</div>
                  </button>
                </div>

                <div style={{width: '18%'}}>
                  <button
                    className='new-product__right-side--seventh-group-button new-product__right-side--seventh-group-button--big new-product__right-side--seventh-group-button--save'
                    type='button'>
                    <div className='button-text--save'>–°–ĺ—Ö—Ä–į–Ĺ–ł—ā—Ć</div>
                  </button>
                </div>

                <div onClick={() => navigate(-1)} style={{width: '18%'}}>
                  <button className='new-product__right-side--seventh-group-button' type='button'>
                    <div className='button-text'>–ě—ā–ľ–Ķ–Ĺ–ł—ā—Ć</div>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </ContexDropDown.Provider>
    </>
  );
}
