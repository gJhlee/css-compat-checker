const fs = require('fs');
const parse = require('css-parse');
const _ = require('lodash');

function loadCsv(path) {
    const csv = fs.readFileSync(path);
    let lines = csv.toString().split("\n");
    let data = {};
    for (let line of lines) {
        let [property, edge, firefox, chrome, safari, opera] = line.trim().split(",");
        data[property] = _.mapValues({ edge, firefox, chrome, safari, opera }, function(value) {
            return +value;
        });
    }
    return data;
}

function checkCss(css, data) {

    let compatable = {
        edge: { max: 0, high: 0 },
        firefox: { max: 0, high: 0 },
        chrome: { max: 0, high: 0 },
        safari: { max: 0, high: 0 },
        opera: { max: 0, high: 0 }
    };

    let proerties = [];
    let notSupports = [];
    let ruleCount = 0;
    let p = parse(css);
    _.each(p.stylesheet.rules, (rule) => {
        ruleCount += 1;
        _.each(rule.declarations, (declaration) => {
            proerties.push(declaration.property);
            if (data[declaration.property] === undefined) {
                notSupports.push(declaration.property);
                return;
            }
            _.each(["edge", "firefox", "chrome", "safari", "opera"], (name) => {
                let ver = _.get(data, [declaration.property, name]);
                if (compatable[name].max < ver) {
                    compatable[name].max = ver;
                    compatable[name].high = declaration.property;
                }
            });
        });
    });
    return { compatable, proerties, notSupports, ruleCount };
};

const css = fs.readFileSync('./test.css', 'utf-8');
const result = checkCss(css, loadCsv('./compat.csv'));


// proerties = _.sortedUniq(proerties);

let output = `\n\n** Check ${result.ruleCount} rules. ${_.size(_.uniq(result.proerties))} properties

** Supported properties **
        |  support version  |     property
--------+-------------------|----------------\n`;

_.each(result.compatable, (property, key) => {
    output += `${key.padEnd(7)} |   ${("" + property.max).padEnd(15)} |  ${property.high}\n`;
});


output += "\n** Not supported properties **\n";
_.each(_.uniq(result.notSupports), (property) => {
    output += `> ${property}\n`;
});

console.log(output);
