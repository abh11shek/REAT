// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract realEstate {
	
    // Declaring state variables in this section
	uint8 public avgBlockTime;
	uint8 private decimals;
	uint8 public tax;
	uint8 public rentalLimitMonths;
	uint256 public rentalLimitBlocks;
	uint256 constant private MAX_UINT256 = 2**256 - 1;
	uint256 public totalSupply;
	uint256 public totalSupply2;
	uint256 public rentPer30Day;
	uint256 public accumulated;
	uint256 public blocksPer30Day;
	uint256 public rentalBegin;
	uint256 public occupiedUntill;
	uint256 private _taxdeduct;

	string public name;
	string public symbol;

	address public gov = msg.sender;
	address public mainPropertyOwner;
	address public tenant;

	address[] public stakeholders;

	mapping (address => uint256) public revenues;
	mapping (address => uint256) public shares;
	mapping (address => mapping (address => uint256)) private allowed;
	mapping (address => uint256) public rentpaidUntill;
	mapping (address => uint256) public sharesOffered;
    mapping (address => uint256) public shareSellPrice;

	// Defining events
	event ShareTransfer(address indexed from, address indexed to, uint256 shares);
	event Seizure(address indexed seizedfrom, address indexed to, uint256 shares);
	event ChangedTax(uint256 NewTax);
	event MainPropertyOwner(address NewMainPropertyOwner);
	event NewStakeHolder(address StakeholderAdded);
	event CurrentlyEligibletoPayRent(address Tenant);
	event PrePayRentLimit (uint8 Months);
	event AvgBlockTimeChangedTo(uint8 s);
	event RentPer30DaySetTo (uint256 WEIs);
	event StakeHolderBanned (address banned);
	event RevenuesDistributed (address shareholder, uint256 gained, uint256 total);
	event Withdrawal (address shareholder, uint256 withdrawn);
	event Rental (uint256 date, address renter, uint256 rentPaid, uint256 tax, uint256 distributableRevenue, uint256 rentedFrom, uint256 rentedUntill);
	event SharesOffered(address Seller, uint256 AmmountShares, uint256 PricePerShare);
	event SharesSold(address Seller, address Buyer, uint256 SharesSold,uint256 PricePerShare);

	constructor (string memory _propertyID, string memory _propertySymbol, address _mainPropertyOwner, uint8 _tax, uint8 _avgBlockTime) {
		shares[_mainPropertyOwner] = 100;
		totalSupply = 100;
		totalSupply2 = totalSupply**2;
		name = _propertyID;
		decimals = 0;
		symbol = _propertySymbol;
		tax = _tax;
		mainPropertyOwner = _mainPropertyOwner;
		stakeholders.push(gov);
		stakeholders.push(mainPropertyOwner);
		allowed[mainPropertyOwner][gov] = MAX_UINT256;
		avgBlockTime = _avgBlockTime;
	    blocksPer30Day = 60*60*24*30/avgBlockTime;
	    rentalLimitMonths = 12;
	    rentalLimitBlocks = rentalLimitMonths * blocksPer30Day;
	}

	// Define modifiers in this section
	modifier onlyGov{
	  require(msg.sender == gov);
	  _;
	}
	modifier onlyPropOwner{
	    require(msg.sender == mainPropertyOwner);
	    _;
	}
	modifier isMultipleOf{
	   require(msg.value % totalSupply2 == 0);
	    _;
	}
	modifier eligibleToPayRent{
	    require(msg.sender == tenant);
	    _;
	}

	// Defining functions in this section

    //Viewable functions
	function showSharesOf(address _owner) public view returns (uint256 balance) {
		return shares[_owner];
	}

	 function isStakeholder(address _address) public view returns(bool, uint256) {
	    for (uint256 s = 0; s < stakeholders.length; s += 1){
	        if (_address == stakeholders[s]) return (true, s);
	    }
	    return (false, 0);
	 }

    function currentTenantCheck (address _tenantcheck) public view returns(bool,uint256){
        require(occupiedUntill == rentpaidUntill[tenant], "The entered address is not the current tenant");
        if (rentpaidUntill[_tenantcheck] > block.number){
            uint256 daysRemaining = (rentpaidUntill[_tenantcheck] - block.number)*avgBlockTime/86400;
            return (true, daysRemaining);
        }
        else return (false, 0);
    }

    //Functions of government
    function addStakeholder(address _stakeholder) public onlyGov {
		(bool _isStakeholder, ) = isStakeholder(_stakeholder);
		if (!_isStakeholder) stakeholders.push(_stakeholder);
		allowed[_stakeholder][gov] = MAX_UINT256;
		emit NewStakeHolder (_stakeholder);
    }

	function banStakeholder(address _stakeholder) public onlyGov {
	    (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
	    if (_isStakeholder){
	        stakeholders[s] = stakeholders[stakeholders.length - 1];
	        stakeholders.pop();
	        seizureFrom (_stakeholder, msg.sender,shares[_stakeholder]);    //...seizes shares
	        emit StakeHolderBanned(_stakeholder);
	    }
	}

	function setTax (uint8 _x) public onlyGov {                             //set new tax rate (for incoming rent being taxed with %)
	   require( _x <= 100, "Valid tax rate  (0% - 100%) required" );
	   tax = _x;
	   emit ChangedTax (tax);
	}

	function SetAvgBlockTime (uint8 _sPerBlock) public onlyGov{         //we do not have a forgery proof time measurement in Ethereum. Therefore we count the ammount of blocks. One Block equals to 13s but this can be changed by the government.
	    require(_sPerBlock > 0, "Please enter a Value above 0");
	    avgBlockTime = _sPerBlock;
	    blocksPer30Day = (60*60*24*30) / avgBlockTime;
	    emit AvgBlockTimeChangedTo (avgBlockTime);
	}

   function distribute() public onlyGov {
        uint256 _accumulated = accumulated;
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            address stakeholder = stakeholders[s];
            uint256 _shares = showSharesOf(stakeholder);
            uint256 ethertoreceive = (_accumulated/(totalSupply))*_shares;
            accumulated = accumulated - ethertoreceive;
            revenues[stakeholder] = revenues[stakeholder] + ethertoreceive;
            emit RevenuesDistributed(stakeholder,ethertoreceive, revenues[stakeholder]);
        }
   }

    //hybrid Governmental
	function seizureFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		uint256 allowance = allowed[_from][msg.sender];
		require(shares[_from] >= _value && allowance >= _value);
		shares[_to] += _value;
		shares[_from] -= _value;
		if (allowance < MAX_UINT256) {
			allowed[_from][msg.sender] -= _value;
		}
		emit Seizure(_from, _to, _value);
		return true;
	}

    //MainPropertyOwner functions
	function canPayRent(address _tenant) public onlyPropOwner{
	     tenant = _tenant;
	     emit CurrentlyEligibletoPayRent (tenant);
	}
	function limitadvancedrent(uint8 _monthstolimit) onlyPropOwner public{
	    rentalLimitBlocks = _monthstolimit *blocksPer30Day;
	    emit PrePayRentLimit (_monthstolimit);
	}

    function setRentper30Day(uint256 _rent) public onlyPropOwner{
	    rentPer30Day = _rent;
	    emit RentPer30DaySetTo (rentPer30Day);
    }

    //Stakeholder functions
    function offerShares(uint256 _sharesOffered, uint256 _shareSellPrice) public{
        (bool _isStakeholder, ) = isStakeholder(msg.sender);
        require(_isStakeholder);
        require(_sharesOffered <= shares[msg.sender]);
        sharesOffered[msg.sender] = _sharesOffered;
        shareSellPrice[msg.sender] = _shareSellPrice;
        emit SharesOffered(msg.sender, _sharesOffered, _shareSellPrice);
    }

    function buyShares (uint256 _sharesToBuy, address payable _from) public payable{
        (bool _isStakeholder, ) = isStakeholder(msg.sender);
        require(_isStakeholder);
        require(msg.value == _sharesToBuy * shareSellPrice[_from] && _sharesToBuy <= sharesOffered[_from] && _sharesToBuy <= shares[_from] &&_from != msg.sender); //
        allowed[_from][msg.sender] = _sharesToBuy;
        seizureFrom(_from, msg.sender, _sharesToBuy);
        sharesOffered[_from] -= _sharesToBuy;
        _from.transfer(msg.value);
        emit SharesSold(_from, msg.sender, _sharesToBuy,shareSellPrice[_from]);
    }

	function transfer(address _recipient, uint256 _amount) public returns (bool) {
        (bool isStakeholderX, ) = isStakeholder(_recipient);
	    require(isStakeholderX);
	    require(shares[msg.sender] >= _amount);
	    shares[msg.sender] -= _amount;
	    shares[_recipient] += _amount;
	    emit ShareTransfer(msg.sender, _recipient, _amount);
	    return true;
	 }

	function claimOwnership () public {
		require(shares[msg.sender] > (totalSupply /2) && msg.sender != mainPropertyOwner,"Error. You do not own more than 50% of the property tokens or you are the main owner allready");
		mainPropertyOwner = msg.sender;
		emit MainPropertyOwner(mainPropertyOwner);
	}

   	function withdraw() payable public {
        uint256 revenue = revenues[msg.sender];
        revenues[msg.sender] = 0;
        payable(msg.sender).transfer(revenue);
        emit Withdrawal(msg.sender, revenue);
   }

    //Renter function
    function payRent(uint8 _months) public payable isMultipleOf eligibleToPayRent{
        uint256  _rentdue  = _months * rentPer30Day;
        uint256  _additionalBlocks  = _months * blocksPer30Day;
        require (msg.value == _rentdue && block.number + _additionalBlocks < block.number + rentalLimitBlocks);
        _taxdeduct = (msg.value/totalSupply * tax);
        accumulated += (msg.value - _taxdeduct);
        revenues[gov] += _taxdeduct;
        if (rentpaidUntill[tenant] == 0 && occupiedUntill < block.number) {
            rentpaidUntill[tenant] = block.number + _additionalBlocks;
            rentalBegin = block.number;
        }
        else if (rentpaidUntill[tenant] == 0 && occupiedUntill > block.number) {
            rentpaidUntill[tenant] = occupiedUntill + _additionalBlocks;
            rentalBegin = occupiedUntill;
        }
        else if ( rentpaidUntill[tenant] > block.number) {
            rentpaidUntill[tenant] += _additionalBlocks;
            rentalBegin = occupiedUntill;
        }
        else if (rentpaidUntill[tenant] < block.number && occupiedUntill>block.number) {
            rentpaidUntill[tenant] = occupiedUntill +_additionalBlocks;
            rentalBegin = occupiedUntill;
        }
        else if (rentpaidUntill[tenant] < block.number && occupiedUntill<block.number) {
            rentpaidUntill[tenant] = block.number + _additionalBlocks;
            rentalBegin = block.number;
        }
        occupiedUntill  = rentpaidUntill[tenant];
        emit Rental (block.timestamp, msg.sender, msg.value, _taxdeduct, (msg.value - _taxdeduct), rentalBegin, occupiedUntill);
    }


    //Falback
    receive () external payable {
        payable(msg.sender).transfer(msg.value);
        }
}