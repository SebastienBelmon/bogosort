import React from 'react';

const initialList = [3, 2, 1, 4, 5, 6, 7];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      sortedList: [...initialList],
      isSorted: false,
      sortIntervalId: 0,
      range: 100,
    };
  }

  bogosort = list => {
    let count = list.length;
    let temp;
    let index;

    while (count > 0) {
      index = Math.floor(Math.random() * count);
      count--;

      temp = list[count];
      list[count] = list[index];
      list[index] = temp;
    }

    this.setState(prevState => ({
      counter: prevState.counter + 1,
      sortedList: list,
    }));

    if (this.testIsSorted(list)) {
      this.setState({ isSorted: true });
      this.stopSort();
    }

    return list;
  };

  testIsSorted = list => {
    for (let i = 1; i < list.length; i++) {
      if (list[i - 1] > list[i]) {
        return false;
      }
    }

    return true;
  };

  startSort = intervalTime => {
    let intervalID = setInterval(
      () => this.bogosort(initialList),
      intervalTime
    );
    this.setState({ sortIntervalId: intervalID });
  };

  stopSort = () => {
    clearTimeout(this.state.sortIntervalId);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { counter, isSorted, sortedList, range } = this.state;

    return (
      <div style={{ maxWidth: 850, marginRight: 'auto', marginLeft: 'auto' }}>
        <h1>Bogo Sort</h1>
        <h2>Manual iteration</h2>
        <button onClick={() => this.bogosort(initialList)} disabled={isSorted}>
          Start sorting
        </button>
        {isSorted && (
          <button
            onClick={() =>
              this.setState({
                counter: 0,
                sortedList: [...initialList],
                isSorted: false,
                sortIntervalId: 0,
              })
            }
          >
            Reset
          </button>
        )}
        <h2>Automatic iteration</h2>
        <div>
          <label htmlFor="range">Iteration speed: {range}ms</label>
          <br />
          <input
            id="range"
            name="range"
            onChange={e => this.handleChange(e)}
            value={range}
            min={0}
            max={500}
            step={10}
            type="range"
          />
        </div>
        <button onClick={() => this.startSort(range)}>
          Start automatic sorting
        </button>

        <button onClick={() => this.stopSort()}>Stop automatic sorting</button>

        <h2>Monitoring</h2>
        <div>counter: {counter}</div>
        <div>result: {JSON.stringify(sortedList)}</div>
        <div>isSorted: {JSON.stringify(isSorted)}</div>
      </div>
    );
  }
}

export default App;
