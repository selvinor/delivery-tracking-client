//import * as actions from '../actions'; 
const initialState = {
  orders: [],
  hasErrored : false,
  isLoading : false,
  showLogin : false
}

export const orderReducer = (state=initialState, action) => {
  
  switch (action.type) {
    case 'SUBSCRIPTIONS_HAS_THREW_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
    });  

    case 'SUBSCRIPTIONS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
    }); 
    case  'LOAD_TEST_DATA':
    return Object.assign({}, state, {
      subscriptions: action.testData
  }); 

    case 'FETCH_SUBSCRIPTION_SUCCEEDED':
    // console.log('subscription success action.subscriptions: ', action.subscriptions);
      return Object.assign({}, state, {        
        subscriptions: action.subscriptions
    });

    case 'ADD_SUBSCRIPTION_SUCCEEDED':
    return Object.assign({}, state, {
      subscriptions: [...state.subscriptions, action.newSubscription]
    });

    case 'SET_NUMBER_OF_DELIVERIES':
    return Object.assign({}, state, {
      numberOfDeliveries: action.numberOfDeliveries,
      formSection: 'checkout'
    });

    case 'SET_PRODUCT_CHOICE':
    // console.log('SET_PRODUCT_CHOICE action.productCode: ',action.productCode);
      switch (action.productCode) {
        case 'p1':
          action.productCode = "p1";
          action.productName = "Designer's Wrap";
          action.productDesc = "Perfect for arranging in a favorite vase. An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.";
          action.productPhoto = "../../img/_DSC3345_280.png";
          action.productPrice = "40";
          break;
        case 'p2':
          action.productCode = "p2";
          action.productName = "Designer's Choice";
          action.productDesc = "Beautiful, fresh, custom flower arrangement for your home or office, perfect for beautifying a room. Delivered on a weekly or monthly basis. Plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions. ";
          action.productPhoto = "../../img/_DSC2980_280.png";
          action.productPrice = "85";
          break;
        case 'p3':
          action.productCode = "p3";
          action.productName = "Designer's Lobby";  
          action.productDesc = "Perfectly accents an entryway or lobby. See your lobby transformed by each successive flower product. As the season changes, so does the theme.";
          action.productPhoto = "../../img/_DSC3098_280.png";            
          action.productPrice = "140";
          break;
        default:
          action.productCode = "p1";
          action.productName = "Designer's Wrap";
          action.productDesc = "Perfect for arranging in a favorite vase. An easy way to brighten up and beautify your home or office, plus, you can even schedule deliveries throughout the year based on birthdays, holidays, and special occasions.";
          action.productPhoto = "../../img/_DSC3345_280.png";
          action.productPrice = "40";
      }
      

    return Object.assign({}, state, {
      productChoice: action.productCode,
      productCode: action.productCode,
      productName: action.productName,
      productPhoto: action.productPhoto,
      productPrice: action.productPrice,
      productDesc: action.productDesc,
      formSection: 'recipient'
    });

    case 'SET_FREQUENCY':
    return Object.assign({}, state, {
      frequency: action.frequency      
    });

    case 'SET_DURATION':
    return Object.assign({}, state, {
      duration: action.duration
    });

    case 'SET_DELIVERY_DATE':
    return Object.assign({}, state, {
      deliveryDate: action.deliveryDate
    });

    case 'JUMP_TO_SECTION':
    return Object.assign({}, state, {
      formSection: action.section
    });

    case 'ADD_RECEIVER_TO_SUBSCRIPTION':
      // Do some stuff to add the receiver to the receiver array in subscription 
      return Object.assign({}, state, {
        subscriptions: [...state.subscriptions, action.addReceiver]
    });

    case 'SHOW_LOGIN':
      return Object.assign({}, state, {
        showLogin: true
    });
    
      
    default:
        return state;
  }
}  

export const senderReceiverReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'RECIPIENTS_HAS_THREW_ERRORED':
      return Object.assign({}, state, {
        hasErrored: action.hasErrored
      });  
    case 'RECIPIENTS_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      }); 
    case 'FETCH_RECIPIENTS_SUCCEEDED':
      return Object.assign({}, state, {
        senderReceivers: action.fetchSenderReceiversSuccess
      });
    default:
        return state;
  }
}  
