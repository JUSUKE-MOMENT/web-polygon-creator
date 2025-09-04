import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { PolygonEditor } from '../ui/PolygonEditor';

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <PolygonEditor />
    </Provider>
  );
};

export default App;
