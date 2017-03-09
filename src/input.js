const operatorMapper = {
    'written in ': 'language:',
    'writing ': 'language:',
    'in ': 'location:',
    'with ': ':',
    'having ': ':',
    'more than ': '>',
    'less than ': '<',
    'at least ': '>=',
    'at most ': '<=',
    'trending users': '',
    'trending repos': '',
    'this week': 'weekly',
    'this month': 'monthly',
    'between ': '',
    'using': '',
    ' and ': '..'
};
const operands = ['stars', 'forks', 'repos', 'followers', 'topics', 'topic', 'size'];
const periods = ['today', 'weekly', 'monthly'];

const parseInput = (term) => {
    let input = {group: '', type: '', path: '', query: {}};
    let query;

    term = term.toLowerCase();
    query = replaceAll(term, operatorMapper);
    query = buildQuery(query);

    if (/trending users/.test(term)) {
        input = parseTrendingUsers(query, input);
    } else if (/trending/.test(term)) {
        input = parseTrending(query, input);
    } else if (term.split(' ')[0] === 'user' || term.split(' ')[1] === 'user') {
        input = parseUsers(query, input);
    } else {
        input = parseRepos(query, input);
    }

    return input;
};

function replaceAll(term, values) {
    let matches = Object.keys(values).join('|');
    let regex = new RegExp(`(${matches})`, 'g');

    return term.replace(regex, function (a, b) {
        let r = values[b];
        return typeof r === 'string' ? r : a;
    });
}

function buildQuery(term) {
    let query = [];

    term.split(' ').forEach(function(element, i) {
        if (operands.indexOf(element) >= 0) {
            query[query.length - 1] = element + query[query.length - 1];
        } else if (element !== '' && element !== 'user' && element !== 'repo') {
            query.push(element);
        }
    })

    return query;
}

function getPath(query, input) {
    query.forEach(function(element) {
        if (periods.indexOf(element) >= 0) {
            input.query = {since : element};
        } else {
            input.path = element;
        }
    });

    return input;
}

function parseTrending(query, input) {
    input = getPath(query, input);
    input.group = 'repos',
    input.type = 'trending';
    input.path = 'trending/' + input.path;

    return input;
}

function parseTrendingUsers(query, input) {
    input = getPath(query, input);
    input.group = 'users',
    input.type = 'trending';
    input.path = input.path;

    return input;
}

function parseUsers(query, input) {
    input.group = 'users',
    input.type = 'users';
    input.query = {
        type: 'Users',
        q: query.join(' ')
    };

    return input;
}

function parseRepos(query, input) {
    input.group = 'repos',
    input.type = 'repos';
    input.path = 'search';
    input.query = {
        type: 'Repositories',
        q: query.join(' ')
    };

    return input;
}

module.exports = parseInput;
