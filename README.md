//index.html


<!DOCTYPE html>
<html lang="en">
    <head>
       	<meta charset="utf-8">
	<title>Compliance | NSS2</title>
	<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
	<!-- bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<!-- Font Awesome Icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet" type="text/css" />
    
    <!-- Theme style -->
    <link href="menu-style.css" rel="stylesheet" type="text/css" />
    
     <style>
        	.row
        	{
			    margin-top:40px;
			    padding: 0 10px;
			}
			.panel-red 
			{
			    border-color: #d9534f;
			}
			.panel-red .panel-heading 
			{
			    border-color: #d9534f;
			    color: #fff;
			    background-color: #d9534f;
			}
			.panel-red a 
			{
			    color: #d9534f;
			}
			.panel-red a:hover 
			{
			    color: #b52b27;
			}
			
        </style>
    
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    </head>
    
    <template id="templateBio">
<!-- 				<div class="box box-primary"> -->
					<!-- /.box-header -->
					<div class="box-body">
						<ul class="products-list product-list-in-box">
							<li class="item">
								<div class="product-info">
									<a href="" class="product-title">Ask A Biologist<span
										class="label label-info pull-right">1997</span></a> <span
										class="product-description"> has been hosted by ASU School of Life Sciences since 1997. </span>
								</div>
							</li>
							<br/>
							<!-- /.item -->
							<li class="item">
								<div class="product-info">
									<a href="" class="product-title">Actionbioscience <span
										class="label label-danger pull-right">1998</span></a> <span
										class="product-description"> sponsored by the American Institute of Biological Sciences (AIBS). </span>
								</div>
							</li>
							<br/>
							<!-- /.item -->
							<li class="item">
								<div class="product-info">
									<a href="" class="product-title">Animal Diversity Web <span
										class="label label-warning pull-right">1998</span></a> <span
										class="product-description"> Created by the staff at the Museum of Zoology at the University of Michigan. </span>
								</div>
							</li>
							<br/>
							<!-- /.item -->
							<li class="item">
								<div class="product-info">
									<a href="" class="product-title">Animal Genome Size Database <span
										class="label label-success pull-right">2000</span></a> <span
										class="product-description"> created by Dr. T. Ryan Gregory of the University of Guelph in Canada. </span>
								</div>
							</li>
							<br/>
							<!-- /.item -->
						</ul>
					</div>
					<!-- /.box-footer -->
<!-- 				</div> -->
				<!-- /.box -->
	</template>
    
    <body style="overflow:hidden;">
		<div class="wrapper">
			<header class="main-header">
		        <div id="divMenus">
		        </div>
		    </header>
		    <div class="content-wrapper">
		    	<div id="divPortlets" style="width:100%;height:900px;">
		    		
		    	</div>
			    <section id="divContent" style="width:100%;height:900px;display:none;" >
		          <iframe id="compFrame" width="100%" marginwidth="0" height="99%" marginheight="0" align="middle" scrolling="auto">
		          </iframe>
		        </section><!-- /.content -->
		    </div><!-- /.content-wrapper -->
		 </div><!-- ./wrapper -->
<!-- 		<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.3/webcomponents.js"></script> -->

		<script src="app.js"></script>
	    <script src="menu.js"></script>
	     <script src="dashboard.js"></script>
		<!-- jQuery 2.1.4 -->
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
		<!-- Bootstrap -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	    

    </body>
</html>

----------------------------------------------------------------------------------------
//menu-style.css

@import url(http://fonts.googleapis.com/css?family=Open+Sans:700);
.nomuraMenu 
{
  background: #dd4b39;
  width: auto;
}
.nomuraMenu ul 
{
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1;
  display: block;
  zoom: 1;
}
.nomuraMenu ul:after 
{
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
.nomuraMenu ul li 
{
  display: inline-block;
  padding: 0;
  margin: 0;
}
.nomuraMenu.align-right ul li 
{
  float: right;
}
.nomuraMenu.align-center ul 
{
  text-align: center;
}
.nomuraMenu ul li a 
{
  color: #ffffff;
  text-decoration: none;
  display: block;
  padding: 5px 25px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  position: relative;
  -webkit-transition: color .25s;
  -moz-transition: color .25s;
  -ms-transition: color .25s;
  -o-transition: color .25s;
  transition: color .25s;
}
.nomuraMenu ul li.hover a 
{
  color: #333333;
}
.nomuraMenu ul li.hover a:before 
{
  width: 100%;
}
.nomuraMenu ul li a:after 
{
  content: "";
  display: block;
  position: absolute;
  right: -3px;
  top: 9px;
  height: 6px;
  width: 6px;
  background: #ffffff;
  opacity: .5;
}
.nomuraMenu ul li a:before 
{
  content: "";
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 0;
  background: #333333;
  -webkit-transition: width .25s;
  -moz-transition: width .25s;
  -ms-transition: width .25s;
  -o-transition: width .25s;
  transition: width .25s;
}
.nomuraMenu ul li.last > a:after,
.nomuraMenu ul li:last-child > a:after 
{
  display: none;
}
.nomuraMenu ul li.active a 
{
  color: #333333;
}
.nomuraMenu ul li.active a:before 
{
  width: 100%;
}
.nomuraMenu.align-right li.last > a:after,
.nomuraMenu.align-right li:last-child > a:after 
{
  display: block;
}
.nomuraMenu.align-right li:first-child a:after 
{
  display: none;
}
@media screen and (max-width: 768px) 
{
  .nomuraMenu ul li 
  {
    float: none;
    display: block;
  }
  .nomuraMenu ul li a 
  {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 1px solid #fb998c;
  }
  .nomuraMenu ul li.last > a,
  .nomuraMenu ul li:last-child > a 
  {
    border: 0;
  }
  .nomuraMenu ul li a:after 
  {
    display: none;
  }
  .nomuraMenu ul li a:before 
  {
    display: none;
  }
}
