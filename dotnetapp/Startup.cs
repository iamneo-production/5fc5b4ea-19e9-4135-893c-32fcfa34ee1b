<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
     <GenerateAssemblyInfo>false</GenerateAssemblyInfo>
    <GenerateTargetFrameworkAttribute>false</GenerateTargetFrameworkAttribute> 
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNet.WebApi.Cors" Version="5.2.9" />
    <PackageReference Include="Microsoft.AspNetCore.Cors" Version="2.2.0" />
    <PackageReference Include="Microsoft.AspNetCore.Http" Version="2.2.2" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="6.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="6.0">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="6.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="6.0" />
    <PackageReference Include="Moq" Version="4.18.4" />
    <PackageReference Include="NUnit" Version="3.13" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="5.6.3" />
    <PackageReference Include="System.Data.SqlClient" Version="4.8.5" />
  </ItemGroup>

</Project>