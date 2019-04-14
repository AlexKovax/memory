import React from 'react';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            step: 'welcome',
            tabMemory: [],
            tabUserFound: [],
            firstChoice: null,
            secondChoice: null,
            time: 0
        }
    }

    componentDidMount() {
        let tabJeu = [];
        for (let i = 0; i < 18; i++) {
            let fruit = 'fruit-' + i;
            tabJeu.push(fruit);
            tabJeu.push(fruit);
        }

        //on garde que les 28 premiers
        tabJeu = tabJeu.slice(0, 28)

        //randomize
        tabJeu = tabJeu.sort(function () { return 0.5 - Math.random() })

        this.setState({ tabMemory: tabJeu });

    }

    handleClick(position) {

        if (this.state.firstChoice === position) {
            //si le joueur reclique sur la même carte rien ne se passe
            return;
        }

        //enregistrer position dans le tableau
        if (this.state.firstChoice === null) {
            return this.setState({ firstChoice: position });
        }
        if (this.state.secondChoice === null) {
            this.setState({ secondChoice: position });
            if (this.state.tabMemory[this.state.firstChoice] === this.state.tabMemory[position]) {
                //paires trouvées
                let tab = this.state.tabUserFound;
                tab.push(this.state.firstChoice);
                tab.push(position);
                this.setState({ tabUserFound: tab, firstChoice: null, secondChoice: null })

                //tester la victoire
                if (tab.length === tabMemory.length) {
                    alert('Victoire')
                    //Todo : enregistrer le temps dans la base de données
                }

            } else {
                //paire non trouvées
                setTimeout(() => {
                    this.setState({ firstChoice: null, secondChoice: null })
                }, 1000)

            }
        }

    }

    pressStart() {
        this.setState({ step: 'game' })
        //Lancement chrono
        setInterval(() => {
            this.setState({ time: ++this.state.time })
        }, 1000)
    }

    render() {

        if (this.state.step === 'welcome') {
            //ECRAN ACCUEIL
            return (
                <div>
                    <h1>welcome to memory 2000.</h1>
                    <h2>High scores</h2>
                    <ul>
                        <li>Todo</li>
                    </ul>
                    <button onClick={this.pressStart.bind(this)}>Lancer le jeu !</button>
                </div>
            )
        } else if (this.state.step === 'game') {
            //JEU
            return (
                <div className='container'>
                    <div>
                        Temps : {this.state.time}s
                    </div>

                    {this.state.tabMemory.map((item, position) => {
                        let classes = item;
                        if (this.state.tabUserFound.indexOf(position) === -1 && this.state.firstChoice !== position && this.state.secondChoice !== position) {
                            classes += ' hidden';
                        }

                        return (
                            <div className={classes} key={position} onClick={this.handleClick.bind(this, position)}></div>
                        )
                    })}
                </div>
            )
        }

    }

}

export default Home;
