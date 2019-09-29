
const END = 'E';
const NUMBER = 'N';

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let curr_tok;
    let number_value;

    let pos = 0;

    get_token();
    e = expr();

    switch (curr_tok) {
        case END:
            break;
        case ')':
            throw new Error('ExpressionError: Brackets must be paired');
        default:
            throw new Error('ExpressionError: Syntax error');
    }

    return e;


    function expr() { // складывает и вычитает
        let left = term();

        for (; ;) {
            switch (curr_tok) {
                case '+':
                    get_token();
                    left += term();
                    break;
                case '-':
                    get_token();
                    left -= term();
                    break;
                default:
                    return left;
            }
        }
    }

    function term() { // умножает и делит
        let left = prim();

        for (; ;) {
            switch (curr_tok) {
                case '*':
                    get_token();
                    left *= prim();
                    break;
                case '/':
                    get_token();
                    const p = prim();
                    if (p == 0) {
                        throw new Error('TypeError: Division by zero.');
                    }
                    left /= p;
                    break;
                default:
                    return left;
            }
        }
    }

    function prim() { // обрабатывает числа, скобки и унарный минус
        switch (curr_tok) {
            case NUMBER:
                get_token();
                return number_value;
            case '-':
                get_token();
                return -prim();
            case '(':
                get_token();
                const e = expr();
                if (curr_tok != ')') {
                    throw new Error('ExpressionError: Brackets must be paired');
                }
                get_token();
                return e;
            case END:
                return 1;
            default:
                throw new Error('Требуется число');
        }
    }

    function get_token() {
        for (; pos < str.length; pos++) {
            const ch = str[pos];
            if (ch != ' ') {
                break;
            }
        }

        if (pos == str.length) {
            return curr_tok = END;
        }

        const ch = str[pos];
        switch (ch) {
            case '*':
            case '/':
            case '+':
            case '-':
            case '(':
            case ')':
                pos++;
                return curr_tok = ch;
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                get_number();
                return curr_tok = NUMBER;
            default:
                throw new Error('Недопустимая лексема');
        }
    }

    function get_number() {
        const start = pos;

        for (; pos < str.length; pos++) {
            const ch = str[pos];
            switch (ch) {
                case '0': case '1': case '2': case '3': case '4':
                case '5': case '6': case '7': case '8': case '9':
                    continue;
            }

            break;
        }

        return number_value = parseInt(str.slice(start, pos));
    }

    // write your solution here
}

module.exports = {
    expressionCalculator
}