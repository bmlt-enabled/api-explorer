<script lang="ts">
    import { getContext } from 'svelte';

    interface QueryContextType {
        excludedFormats: string[];
        includedFormats: string[];
        includedDays: string[];
        excludedDays: string[];
        includedBodies: string[];
        excludedBodies: string[];
        dataFormat: string;
        dataQuery: string;
        formatComparison: string;
        htmlSimple: string;
        textSearch: string;
        searchType: string;
        searchRadius: string;
        startEndTime: string;
        meetingDuration: string;
        specificFields: string;
        sortResponse: string;
        includedVenueTypes: string[];
        excludedVenueTypes: string[];
        selectedResponse: number;
        specificText: string;
        checkedBoxesString: string;
        formatLanguage: string;
        getChangesQuery: string;
        valueList: string;
        nawsServiceBody: string;
        XMLCheckBoxes: string;
    }

    let queryState: QueryContextType = {
        excludedFormats: [],
        includedFormats: [],
        includedDays: [],
        excludedDays: [],
        includedBodies: [],
        excludedBodies: [],
        dataFormat: '',
        dataQuery: '',
        formatComparison: '',
        htmlSimple: '',
        textSearch: '',
        searchType: '',
        searchRadius: '',
        startEndTime: '',
        meetingDuration: '',
        specificFields: '',
        sortResponse: '',
        includedVenueTypes: [],
        excludedVenueTypes: [],
        selectedResponse: 0,
        specificText: '',
        checkedBoxesString: '',
        formatLanguage: '',
        getChangesQuery: '',
        valueList: '',
        nawsServiceBody: '',
        XMLCheckBoxes: ''
    };

    let root_server_url: string | null = null;

    const queryContext = getContext<{ subscribe: (callback: (value: QueryContextType) => void) => void }>('QueryContext');
    const globalContext = getContext<{ subscribe: (callback: (value: { root_server_url: string | null }) => void) => void }>('GlobalContext');

    queryContext.subscribe(value => {
        queryState = value;
    });

    globalContext.subscribe(value => {
        root_server_url = value.root_server_url;
    });

    let formatsArr = [...queryState.includedFormats, ...queryState.excludedFormats];
    if (formatsArr.length > 1) {
        formatsArr = formatsArr.map(i => '&formats[]=' + i);
    } else {
        formatsArr = formatsArr.map(i => '&formats=' + i);
    }

    let daysArr = [...queryState.includedDays, ...queryState.excludedDays];
    if (daysArr.length > 1) {
        daysArr = daysArr.map(i => '&weekdays[]=' + i);
    } else {
        daysArr = daysArr.map(i => '&weekdays=' + i);
    }

    let bodiesArr = [...queryState.includedBodies, ...queryState.excludedBodies];
    if (bodiesArr.length > 1) {
        bodiesArr = bodiesArr.map(i => '&services[]=' + i);
    } else {
        bodiesArr = bodiesArr.map(i => '&services=' + i);
    }

    let txtVal = '';
    if (queryState.textSearch.length > 0) {
        txtVal = '&SearchString=' + queryState.textSearch;
    }

    let tempSearchString = '';
    switch (queryState.searchType) {
        case '1':
            tempSearchString = '&SearchStringAll=1';
            break;
        case '2':
            tempSearchString = '&SearchStringExact=1';
            break;
        case '3':
            tempSearchString = '&StringSearchIsAnAddress=1';
            break;
        default:
            tempSearchString = '';
    }

    let tempSearchRadius = '';
    if (queryState.searchType === '3' && queryState.searchRadius) {
        tempSearchRadius = `&SearchStringRadius=${queryState.searchRadius}`;
    }

    let joinArr = [...bodiesArr, ...daysArr, ...formatsArr].join('');
    if (txtVal.length > 0) {
        txtVal += tempSearchString + tempSearchRadius;
    }
    let queryArr = joinArr + queryState.formatComparison + queryState.htmlSimple + txtVal;
    queryArr = queryArr.replace(/\s/g, '%20');

    const finalSearchString = queryArr +
        queryState.startEndTime +
        queryState.meetingDuration +
        queryState.specificFields +
        queryState.sortResponse +
        queryState.includedVenueTypes +
        queryState.excludedVenueTypes +
        queryState.specificText +
        queryState.checkedBoxesString +
        queryState.formatLanguage +
        queryState.getChangesQuery +
        queryState.valueList +
        queryState.nawsServiceBody +
        queryState.XMLCheckBoxes;

    let queryString = '';
    if (queryState.selectedResponse === 0) {
        queryString = `${root_server_url}/client_interface/${queryState.dataFormat}/${queryState.dataQuery}${finalSearchString}`;
    } else if (queryState.selectedResponse === 1) {
        queryString = `[[BMLT_SIMPLE(${queryState.dataQuery.substring(1)}${finalSearchString})]]`;
    } else {
        queryString = `[[BMLT_TABLE(${finalSearchString})]]`;
    }
</script>

<div class="hmmm">
    {#if root_server_url !== null}
        <h5 class="query-heading text-center">Your Query:</h5>
        <a class="query-string" href={queryString}>{queryString}</a>
    {/if}
</div>
