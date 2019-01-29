import React, { Component } from 'react';
import { Experiment,
        Variant,
        emitter,
        experimentDebugger
} from "@marvelapp/react-ab-test";

import Mixpanel from 'mixpanel';
import './App.css';

experimentDebugger.enable();
emitter.defineVariants('landingPageExperiment', 
                      ['control', 'variant1', 'variant2'], 
                      [34, 33, 33]);

var mixpanel = Mixpanel.init('4c87045490be33ad151c3a6803ad66cc')



class App extends Component {
  buttonClick(e){
    emitter.emitWin('landingPageExperiment');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          My A/B test app 
        </header>
        <div className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>

        <Experiment name="landingPageExperiment">
          <Variant name='control'>
            <button onClick={this.buttonClick}>Learn More</button>
          </Variant>

          <Variant name='variant1'>
            <button onClick={this.buttonClick} className="variant1">Learn More</button>
          </Variant>

          <Variant name='variant2'>
            <button onClick={this.buttonClick} className="variant2">Learn More</button>
          </Variant>
        </Experiment>

      </div>
    );
  }
}

export default App;

emitter.addPlayListener(function(experimentName, variantName){
  console.log(`Displaying experiment ${experimentName} with variant ${variantName}.`)
});

emitter.addWinListener(function(experimentName, variantName){
  console.log(`Variant ${variantName} from Experiment ${experimentName} was clicked.`)
  mixpanel.track(experimentName, {
    name: experimentName,
    variant: variantName
  })
})