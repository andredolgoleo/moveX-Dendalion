import React, {useState, useEffect, Fragment, useRef} from 'react';

import {db} from './components/api/firebase';
import {uid} from "uid";
import {set, ref, onValue} from 'firebase/database';

import {Menu} from './components/Menu';
import {Info, MemoizedInfo} from './components/Info';
import {CategoryAdd} from './components/ModalWindows/Category';
import {NewProduct} from './components/NewProduct';
import {CategoryManagement} from './components/CategoryManagement';
import {Succes} from './components/ModalWindows/SuccesWindow';

import './App.scss';
import './__variables.scss';
import {getAllData} from './components/api/api';
import {Data} from './components/Info/Types/Data';
import {Context} from './components/Context/Context';
import {ContextButtonHide} from './components/Context/ContextButtonHide'
import {ContextCheckBoxTable} from "./components/Context/ContextCheckBoxTable";

// Main App

import {ReactComponent as Logo} from './img/Logo.svg';
import {ReactComponent as Graph} from './img/graph.svg';
import {ReactComponent as Analyt} from './img/analyt.svg';
import {ReactComponent as Retail} from './img/retail.svg';
import {ReactComponent as Product} from './img/products.svg';
import {ReactComponent as Factory} from './img/factory.svg';
import {ReactComponent as Pocket} from './img/pocket.svg';
import {ReactComponent as File} from './img/file.svg';
import {ReactComponent as PersonIcon} from './img/personIcon.svg';
import {ReactComponent as DropDown} from './img/dropDown.svg';
import {ReactComponent as Notification} from './img/notification.svg';
import {ReactComponent as Message} from './img/message.svg';
import {ReactComponent as Help} from './img/help.svg';
import {ReactComponent as Gift} from './img/gift.svg';
import {ReactComponent as Add} from './img/add.svg';
import {ReactComponent as Storage} from './img/storage.svg';

import {Routes, Route, Link, NavLink} from 'react-router-dom';
import {DublicatedItem} from "./components/DublicatedItem";

const categData = [
  {
    label: 'Все товары',
    description: 'Все товары',
    children: [
      {
        label: 'Продукты',
        description: 'Продукты',
        children: [
          {
            label: 'Фрукты',
            description: 'Фрукты',
            children: [],
          },
          {
            label: 'Овощи',
            description: 'Овощи',
            children: [],
          },
          {
            label: 'Молочные изделия',
            description: 'Молочные изделия',
            children: [],
          },
          {
            label: 'Напитки',
            description: 'Напитки',
            children: [
              {
                label: 'Алкогольные',
                description: 'Алкогольные',
                children: [
                  {
                    label: 'Крепкие',
                    description: 'Крепкие',
                    children: []
                  },
                  {
                    label: 'Слабоалкогольные',
                    description: 'Слабоалкогольные',
                    children: [],
                  }
                ]
              },
              {
                label: 'Безалкогольные',
                description: 'Безалкогольные',
                children: [],
              },
            ]
          },
        ]
      },
      {
        label: 'Велосипеды',
        description: 'Все товары',
        children: [],
      },
      {
        label: 'Одежда',
        description: 'Все товары',
        children: [],
      }
    ]
  }
]

type PropsNav = {
  text?: string
}

export const ProductNavigation: React.FC<PropsNav> = ({text}) => {
  const hrefLink = useRef<any>(null);

  useEffect(() => {
    if (text) return;

    if (hrefLink) {
      hrefLink.current.click();
    }
  }, [])

  return (
    <nav className='products__nav'>
      <ul className={'products__list'}>
        <li>
          <NavLink className={'products__link'} to={'/storage/remains'}>
            Остатки
          </NavLink>
        </li>

        <li>
          <NavLink className={'products__link'} to={'/storage/coming'}>
            Приходы
          </NavLink>
        </li>

        <li>
          <NavLink className={'products__link'} to={'/storage/expenses'}>
            Расходы
          </NavLink>
        </li>

        <li>
          <NavLink className={'products__link'} to={'/storage/removing'}>
            Перемещение
          </NavLink>
        </li>

        <li>
          <NavLink className={'products__link'} ref={hrefLink} to={'/storage/product'}>
            Товары
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

type Props = {
  dataProducts: any[]
}

export const App1: React.FC<Props> = ({dataProducts}) => {
  const [isImageView, setIsImageView] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [settingFields, setSettingsFields] = useState(false);
  const [dublicateButton, setNewProduct] = useState(false); // dublicate button
  const [data, setData] = useState<Data[]>(dataProducts);
  const [sortedItem, setSortedItem] = useState<string | null>(null);
  const [createdCategory, setCreatedCategory] = useState<any[]>([]);
  const [categoryManagement, setCategoryManagement] = useState(false);
  const [categoryData, setCategoryData] = useState<any>(categData);
  const [succesMassage, setSuccesMassage] = useState<any>(false);
  const [hideButton, setHideButton] = useState(false);

  const [checkedItems, setCheckedItems] = useState<Data[]>([]);

  let sortedData: Data[] | null = null;

  const [headers, setHeaders] = useState<string[]>([
    "Наименования",
    "Артикул",
    "Категория",
    "Тип",
    "Ед.изм.",
    'Цена зак.',
    'Цена прод.',
    'Статус',]);

  const handleOnCheckboxTable = (item: Data) => {

    if (checkedItems.find(currItem => currItem === item)) {
      const index = checkedItems.findIndex(currItem => currItem === item);

      checkedItems.splice(index, 1);

      setTimeout(() => {
        setCheckedItems([...checkedItems]);
      }, 50);

      return;
    }

    setCheckedItems([...checkedItems, item]);
  }

  const handleOnCheckbox = (item: string) => {
    if (headers.find(header => header === item)) {
      const a = headers.findIndex(header => header === item);
      headers.splice(a, 1);

      setTimeout(() => {
        setHeaders(headers)
      }, 50);

      return;
    }
    setHeaders([...headers, item])
  }

  useEffect(() => {
    setData(dataProducts)
    const a: any = [];

    const recursive = (arr: any[]) => {

      arr.forEach(item => {
        createdCategory.forEach(category => {
          if (category.parent.includes(item.label)) {
            item.children.push(category)
            return;
          }
        })


        if (item.children) {
          recursive(item.children)
        }
      })

      a.push(arr)
    };

    recursive(categoryData) // function to get all children

    if (createdCategory) {
      setCategoryData(a.reverse()[0])
    }
  }, [createdCategory]);

  const uniqueNameItems = Array.from(new Set(dataProducts.map(item => item.name)));

  const handleOnCreateNewCategory = (label: string, childrenArr: string, description: string = '') => {
    setCreatedCategory([
        {
          label: label,
          description: description,
          children: [],
          parent: childrenArr, // field were will be new category
        }
      ]
    );
  }

  const handleOnSaveDublicate = (item: Data) => {
    setData([...data, item]);
    checkedItems.splice(0, 1);

    if (checkedItems.length > 0) handleOnChangeDublicateButton(true);

    setCheckedItems([...checkedItems]);
    handleOnChangeDublicateButton(false);

    if (checkedItems.length === 0) return;

    setTimeout(() => {
      handleOnChangeDublicateButton(true);
    }, 50);
  }

  const handleOnCancelDublicate = () => {
    checkedItems.splice(0, 1);

    setCheckedItems([...checkedItems]);
    handleOnChangeDublicateButton(false);

    if (checkedItems.length === 0) return;
    setTimeout(() => {
      handleOnChangeDublicateButton(true);
    }, 50);
  }

  const handleOnSort = (type: string, fieldName: string) => {
    if (type === 'string') {

      switch (fieldName.toLowerCase().trim()) {
        case 'наименования':
          sortedData = data.sort((a: Data, b: Data) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1).map(item => item);
          break;

        case 'категория':
          sortedData = data.sort((a: Data, b: Data) => a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1).map(item => item);
          break;

        case 'тип':
          sortedData = data.sort((a: Data, b: Data) => a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1).map(item => item);
          break;

        case 'артикул':
          sortedData = data.sort((a: Data, b: Data) => +a.vendorCode.toLowerCase() - +b.vendorCode.toLowerCase()).map(item => item);
          break;

        case 'ед.изм.':
          sortedData = data.sort((a: Data, b: Data) => a.unitType.toLowerCase() > b.unitType.toLowerCase() ? 1 : -1).map(item => item);
          break;

        case 'статус':

          sortedData = data.sort((a: Data, b: Data) => a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1).map(item => item);
          break;

        default:
          break;
      }
    }

    if (sortedData) {
      if (sortedItem === fieldName) {
        setData([...sortedData.reverse()]);
        setSortedItem(null);
        return;
      }

      setSortedItem(fieldName);
      setData([...sortedData]);
    }
  }

  const handleOnHideButton = () => {
    setHideButton(!hideButton);

  }

  const handleOnCategoryManagementChange = () => {
    setCategoryManagement(true);
  }

  const handleOnClear = () => {
    // setData(getAllData().then);
  }

  const handleOnChangeDublicateButton = (state: boolean) => {
    setNewProduct(state);
  };

  const handleOnChangeImageView = (state: boolean) => {
    setIsImageView(state);
  };

  const handleOnSettingsFields = (state: boolean) => {
    setSettingsFields(state);
  }

  const handleOnCategoryButton = (state: boolean) => {
    setIsCategoryOpen(state);
  };

  const handleOnSuccesMassage = () => {
    setSuccesMassage(true);

    setTimeout(() => {
      setSuccesMassage(false);
    }, 2000)
  }

  const handleOnFilter = ({name, status}: any) => {

    const findName = uniqueNameItems.find(item => (
      item.toLowerCase().trim().includes(name.toLowerCase().trim())
    ))

    console.log(findName)

    // if (!findName) return;

    if (!name && !status) {
      // setData(getAllData());
      return;
    }

    if (name && findName) {
      // setData(getAllData({name, status}));
      return;
    }

    // setData(getAllData({name, status}));
  }

  return (
    <Context.Provider value={{
      checkedItems: checkedItems,
      doubleButtton: checkedItems.length > 0 ? (false) : (true),
    }}>
      {succesMassage && <Succes/>}
      {
        isCategoryOpen && (
          <CategoryAdd
            data={categoryData}
            handleOnSuccesMassage={handleOnSuccesMassage}
            handleOnCreateNewCategory={handleOnCreateNewCategory}
            handleOnCategoryButton={handleOnCategoryButton}/>
        )
      }
      {(checkedItems.length > 0 && dublicateButton)
        ? (
          <DublicatedItem
            handleOnSaveDublicate={handleOnSaveDublicate}
            handleOnCancelDublicate={handleOnCancelDublicate}
            dataCategory={categoryData}
            data={checkedItems[0]}
          />
        )
        : (
          <div className="products">
            <ProductNavigation/>
            <ContextCheckBoxTable.Provider
              value={{
                handleOnCheckBox: handleOnCheckboxTable,
                checkedItems: checkedItems,
              }}
            >
              <div className='products--wrapper'>
                <ContextButtonHide.Provider
                  value={{
                    handleOnHideButton: handleOnHideButton,
                    hideButton: hideButton
                  }}
                >
                  <section
                    style={{
                      position: hideButton ? ('absolute') : 'static',
                      width: hideButton ? ('20%') : '27%',
                      zIndex: hideButton ? (100) : 1,
                    }}
                    className='products__menu menu'
                  >
                    {categoryManagement ? (
                      <CategoryManagement data={categoryData}/>
                    ) : (

                      <Menu
                        onCategoryButton={handleOnCategoryButton}
                        onChangeImageView={handleOnChangeImageView}
                        handleOnFilter={handleOnFilter}
                        handleOnClear={handleOnClear}
                        handleOnSettingsFields={handleOnSettingsFields}
                        handleOnChangeDublicateButton={handleOnChangeDublicateButton}
                        uniqueNameItems={uniqueNameItems}
                        handleOnCategoryManagementChange={handleOnCategoryManagementChange}
                        handleOnCheckbox={handleOnCheckbox}
                        headers={headers}
                      />

                    )}
                  </section>
                  <section className='products__fields fields'>
                    <Info
                      settingFields={settingFields}
                      isCategoryOpen={isCategoryOpen}
                      isImageView={isImageView}
                      data={data}
                      handleOnSort={handleOnSort}
                      headers={headers}
                    />
                  </section>
                </ContextButtonHide.Provider>
              </div>
            </ContextCheckBoxTable.Provider>
          </div>
        )}
    </Context.Provider>
  );
}

// const dataProduct = getAllData()

export const App: React.FC = () => {
  const [dataProduct, setDataProduct] = useState<any>([]);

  console.log(dataProduct)

  useEffect(() => {
    getAllData().then(res => setDataProduct(res));
  }, [])

  return (
    <>
      <main className='main'>
        <nav className='left-sidebar'>
          <ul className='left-sidebar__list'>
            <li className='left-sidebar__item'>
              <Link to={'moveX-Dendalion'}>
                <Logo/>
              </Link>
              <Link to={'graph'}>
                <div className='left-sidebar__item-icon'>
                  <Graph/>

                  <div className='left-sidebar__item-icon--text'>График</div>
                </div>
              </Link>
            </li>
            <Link to={'analytic'}>
              <li className='left-sidebar__item-icon'>
                <Analyt/>

                <div className='left-sidebar__item-icon--text'>Аналитика</div>
              </li>
            </Link>
            <Link to={'retail'}>
              <li className='left-sidebar__item-icon'>
                <Retail/>

                <div className='left-sidebar__item-icon--text'>Розница</div>
              </li>
            </Link>
            <Link to='storage'>
              <li className='left-sidebar__item-icon'>
                <Storage/>

                <div className='left-sidebar__item-icon--text'>Склад</div>
              </li>
            </Link>

            <Link to={'howToCallIt'}>
              <li className='left-sidebar__item-icon'>
                <Product/>

                <div className='left-sidebar__item-icon--text'>График</div>
              </li>
            </Link>
            <Link to={'factory'}>
              <li className='left-sidebar__item-icon'>
                <Factory/>

                <div className='left-sidebar__item-icon--text'>График</div>
              </li>
            </Link>
            <Link to={'finances'}>
              <li className='left-sidebar__item-icon'>
                <Pocket/>

                <div className='left-sidebar__item-icon--text'>Финанси</div>
              </li>
            </Link>
            <Link to={'files'}>
              <li className='left-sidebar__item-icon'>
                <File/>

                <div className='left-sidebar__item-icon--text'>Файли</div>
              </li>
            </Link>
          </ul>
        </nav>
        <Routes>
          <Route path='/'>
            <Route path='storage'>
              <Route index element={<ProductNavigation/>}/>
              <Route path='product'>
                {dataProduct.length > 0 && (
                  <Route index element={<App1 dataProducts={dataProduct}/>}/>
                )}
                <Route path='new-product' element={<NewProduct data={categData}/>}/>
              </Route>
              <Route path='removing' element={<ProductNavigation text={'text'}/>}/>


              {/*<Route path={'removing'} element={<h1>123</h1>}/>*/}
              {/*<Route path={'product'} element={<App1/>}/>*/}
              {/*<Route path='product' element={<App1/>}/>*/}
            </Route>


            <Route path='factory' element={<h1>in developing factory</h1>}/>
            <Route path='files' element={<h1>in developing files</h1>}/>
            <Route path='finances' element={<h1>in developing finances</h1>}/>
            <Route path='howToCallIt' element={<h1>in developing how can i call it</h1>}/>
            <Route path='retail' element={<h1>in developing retail</h1>}/>
            <Route path='analytic' element={<h1>in developing analytic</h1>}/>
            <Route path='graph' element={<h1>in developing graph</h1>}/>
          </Route>
          <Route path='*' element={<h1>Выбирай любую</h1>}/>
        </Routes>
        <nav className='right-sidebar'>
          <ul className='right-sidebar__list'>
            <li className='right-sidebar__item'>
              <PersonIcon/>
              <div className='right-sidebar__item--wrapper'>
                Nickname
                <DropDown/>
              </div>
            </li>
            <li className='right-sidebar__item right-sidebar__item--relative'>
              <Notification/>
              <div className='right-sidebar__item--absolute'>
                3
              </div>
            </li>
            <li><Message/></li>
            <li><Help/></li>
            <li><Gift/></li>
            <li><Add/></li>
            <li><Add/></li>
            <li><Add/></li>
            <li><Add/></li>
            <li><Add/></li>
            <li><Add/></li>
          </ul>
        </nav>
      </main>
    </>
  )
}
