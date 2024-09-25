
interface CashAtHandFormState {
    errors: {
        currency?: string[]
        amount?: string[]
        details?: string[]
        jointIncome?: string[]
        _form?:string[]
    },
    data?: {
        cashAtHand:string
    }
}
interface CashDepositFormState {
    errors: {
        ownerName?: string[]
        relation?: string[]
        registerOwner?: string[]
        accountNo?: string[]
        type?: string[]
        institutionOrBank?: string[]
        location?: string[]
        accountBalance?: string[]
        currency?: string[]
        source?: string[]
        otherSource?: string[]
        otherRelation?: string[]
        _form?:string[]
    },
    data?: {
        cashDeposit:string
    }
}