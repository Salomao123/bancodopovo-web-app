export class FormatadoresUtil {

    static formatarMoeda(valor: number): string {

        if (valor) {
            const numero = valor.toFixed(2).split('.');
            numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        }
        return '';
    }

    static parseMoeda(valor: string): number {

        if (valor) {
            let stringTmp = '';
            for (let i = 0; i <= valor.length; i++) {
                if (valor.charAt(i) !== '.') {
                    if (valor.charAt(i) !== ',') {
                        stringTmp += valor.charAt(i);
                    } else {
                        stringTmp += '.';
                    }
                }
            }

            return +stringTmp;
        }
        return null;
    }

}
